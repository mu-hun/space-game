import { EventEmitter } from './utils.js'

import { starBackground } from './assets/index.js'
import Entity from './entities/entity.js'
import createEnemies, { FORMATION_TYPE } from './entities/createEnemies.js'
import createPlayer from './entities/createPlayer.js'

import * as gameStatus from './gameStatus.js'

import CANVAS_SIZE from './canvasSize.js'

const eventEmitter = new EventEmitter()

const KEY_ACTIONS = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ' ': 'Space',
  Enter: 'Enter',
}

const COLLISION_EVENTS = {
  ENEMY_DESTROY: 'ENEMY_DESTROY',
  PLAYER_COLLIDES_WITH_ENEMY: 'PLAYER_COLLIDES_WITH_ENEMY',
}

const INITIALIZE_STAGE = 'INITIALIZE_STAGE'

/**
 * @type { 'EASY' | 'MEDIUM' | 'HARD'}
 */
let CURRENT_STAGE = gameStatus.STAGES.EASY
/**
 * @type { 'WIN' | 'LOSE' | 'MISSED' | null}
 * */
let GAME_RESULT = null

window.addEventListener('keydown', (event) => {
  if (event.key in KEY_ACTIONS) {
    event.preventDefault()
  }
})
window.addEventListener('keyup', ({ key }) => {
  if (key in KEY_ACTIONS) {
    eventEmitter.emit(KEY_ACTIONS[key])
  }
})

const player = createPlayer()

const moveOffset = 5

eventEmitter.on(KEY_ACTIONS.ArrowUp, () => {
  if (player.y > 0) {
    player.y -= moveOffset + player.speed.y
  }
})

eventEmitter.on(KEY_ACTIONS.ArrowDown, () => {
  if (player.y + player.height < CANVAS_SIZE.HEIGHT) {
    player.y += moveOffset + player.speed.y
  }
})

eventEmitter.on(KEY_ACTIONS.ArrowLeft, () => {
  if (player.x > 0) {
    player.x -= moveOffset + player.speed.x
  }
})

eventEmitter.on(KEY_ACTIONS.ArrowRight, () => {
  if (player.x + player.width < CANVAS_SIZE.WIDTH) {
    player.x += moveOffset + player.speed.x
  }
})

eventEmitter.on(KEY_ACTIONS[' '], () => {
  if (player.canFire()) {
    entities.push(player.fire())
  }
})

function updateEntities() {
  entities = entities.filter((entity) => entity.dead === false)

  const enemies = entities.filter((entity) => entity.type === 'Enemy')
  const lasers = [
    ...entities.filter((entity) => entity.type === 'Laser'),
    ...player.leftLaser,
    ...player.rightLaser,
  ]

  const isAnyEnemyOutOfBounds = enemies.some((enemy) => enemy.isOutOfBounds())

  if (isAnyEnemyOutOfBounds) {
    eventEmitter.emit(gameStatus.RESULT.MISSED)
    return
  }

  for (const enemy of enemies) {
    if (player.isColliding(enemy)) {
      eventEmitter.emit(COLLISION_EVENTS.PLAYER_COLLIDES_WITH_ENEMY, [enemy])
    }
  }

  for (const laser of lasers) {
    for (const enemy of enemies) {
      if (laser.isColliding(enemy)) {
        eventEmitter.emit(COLLISION_EVENTS.ENEMY_DESTROY, [laser, enemy])
      }
    }
  }
}

eventEmitter.on(COLLISION_EVENTS.ENEMY_DESTROY, async (_, [laser, enemy]) => {
  laser.destroy()
  await enemy.destroy()

  player.incrementPoints()

  if (isEnemiesAllDead()) {
    eventEmitter.emit(gameStatus.RESULT.WIN)
  }
})

eventEmitter.on(
  COLLISION_EVENTS.PLAYER_COLLIDES_WITH_ENEMY,
  async (_, [enemy]) => {
    if (enemy.isDestroying()) return
    await enemy.destroy()

    player.decrementLife()

    if (player.dead && !isEnemiesAllDead()) {
      eventEmitter.emit(gameStatus.RESULT.LOSE)
    }
  }
)

eventEmitter.on(KEY_ACTIONS.Enter, () => {
  if (GAME_RESULT === gameStatus.RESULT.WIN) {
    switch (CURRENT_STAGE) {
      case gameStatus.STAGES.EASY:
        CURRENT_STAGE = gameStatus.STAGES.MEDIUM
        break
      case gameStatus.STAGES.MEDIUM:
        CURRENT_STAGE = gameStatus.STAGES.HARD
        break
      case gameStatus.STAGES.HARD:
        return
      default:
        throw new Error('Invalid stage')
    }
    eventEmitter.emit(INITIALIZE_STAGE)
    return
  }

  if (
    GAME_RESULT === gameStatus.RESULT.LOSE ||
    GAME_RESULT === gameStatus.RESULT.MISSED
  ) {
    ;(function resetStage() {
      CURRENT_STAGE = gameStatus.STAGES.EASY
    })()
    eventEmitter.emit(INITIALIZE_STAGE)
    return
  }

  throw new Error('Invalid game result')
})

const isEnemiesAllDead = () =>
  entities
    .filter((entity) => entity.type === 'Enemy')
    .every((enemy) => enemy.dead)

/**
 * @type {Entity[]}
 */
let entities = []

window.onload = async () => {
  const canvas = document.getElementById('canvas')

  canvas.width = CANVAS_SIZE.WIDTH
  canvas.height = CANVAS_SIZE.HEIGHT

  const ctx = canvas.getContext('2d')
  let requestId = null

  function initializeGame() {
    switch (CURRENT_STAGE) {
      case gameStatus.STAGES.EASY:
        entities = [...createEnemies(FORMATION_TYPE.TRIANGLE), player]
        break
      case gameStatus.STAGES.MEDIUM:
        entities = [
          ...createEnemies(FORMATION_TYPE.TRIANGLE, 1, 10, 10),
          player,
        ]
        break
      case gameStatus.STAGES.HARD:
        entities = [...createEnemies(FORMATION_TYPE.SQUARE, 1, 10, 10), player]
        break
      default:
        throw new Error('Invalid stage')
    }
    requestId = requestAnimationFrame(gameLoop)
    player.startAutoFire(ctx)
  }
  initializeGame()

  eventEmitter.on(INITIALIZE_STAGE, () => {
    player.reset()
    initializeGame()
  })

  eventEmitter.on(gameStatus.RESULT.WIN, () => {
    GAME_RESULT = gameStatus.RESULT.WIN
    gameStatus.endGame(
      ctx,
      gameStatus.RESULT.WIN,
      player.points,
      CURRENT_STAGE,
      requestId
    )
  })

  eventEmitter.on(gameStatus.RESULT.LOSE, () => {
    GAME_RESULT = gameStatus.RESULT.LOSE
    gameStatus.endGame(
      ctx,
      gameStatus.RESULT.LOSE,
      player.points,
      CURRENT_STAGE,
      requestId
    )
  })

  eventEmitter.on(gameStatus.RESULT.MISSED, () => {
    GAME_RESULT = gameStatus.RESULT.MISSED
    gameStatus.endGame(
      ctx,
      gameStatus.RESULT.MISSED,
      player.points,
      CURRENT_STAGE,
      requestId
    )
  })

  function gameLoop() {
    const pattern = ctx.createPattern(starBackground, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawEntities()
    updateEntities()
    gameStatus.drawLife(ctx, player.life)
    gameStatus.drawPoints(ctx, player.points)
    gameStatus.drawStage(ctx, CURRENT_STAGE)

    requestId = requestAnimationFrame(gameLoop)
  }

  function drawEntities() {
    for (const entity of entities) {
      entity.draw(ctx)
    }
    player.drawAutoFire(ctx)
  }
}
