import { EventEmitter } from './utils.js'

import { starBackground } from './assets/index.js'
import Entity from './entities/entity.js'
import createEnemies, { FORMATION_TYPE } from './entities/createEnemies.js'
import createPlayer from './entities/createPlayer.js'

import CANVAS_SIZE from './canvasSize.js'

const eventEmitter = new EventEmitter()

const KEY_ACTIONS = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ' ': 'Space',
}

const COLLISION_EVENTS = {
  ENEMY_DESTROY: 'ENEMY_DESTROY',
  PLAYER_COLLIDES_WITH_ENEMY: 'PLAYER_COLLIDES_WITH_ENEMY',
}

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
  const enemies = entities.filter((entity) => entity.type === 'Enemy')
  const lasers = [
    ...entities.filter((entity) => entity.type === 'Laser'),
    ...player.leftLaser,
    ...player.rightLaser,
  ]

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

  entities = entities.filter((entity) => entity.dead === false)
}

eventEmitter.on(COLLISION_EVENTS.ENEMY_DESTROY, async (_, [laser, enemy]) => {
  laser.destroy()
  await enemy.destroy()
})

eventEmitter.on(COLLISION_EVENTS.PLAYER_COLLIDES_WITH_ENEMY, (_, [enemy]) => {
  // TODO: handle player life
})

let entities = [...createEnemies(FORMATION_TYPE.TRIANGLE), player]

window.onload = async () => {
  const canvas = document.getElementById('canvas')

  canvas.width = CANVAS_SIZE.WIDTH
  canvas.height = CANVAS_SIZE.HEIGHT

  const ctx = canvas.getContext('2d')

  player.startAutoFire(ctx)

  function drawEntities() {
    for (const entity of entities) {
      entity.draw(ctx)
    }
    player.drawAutoFire(ctx)
  }

  ;(function gameLoop() {
    const pattern = ctx.createPattern(starBackground, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawEntities()
    updateEntities()

    requestAnimationFrame(gameLoop)
  })()
}
