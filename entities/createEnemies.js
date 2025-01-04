import { enemyImg, laserGreenShot } from '../assets/index.js'
import Entity from './entity.js'

import CANVAS_SIZE from '../canvasSize.js'

const timeout = 400

class Enemy extends Entity {
  constructor(x, y) {
    super(x, y)
    this.width = 98
    this.height = 50

    this.type = 'Enemy'
    let id = setInterval(() => {
      if (this.y < CANVAS_SIZE.HEIGHT - this.height || this.dead) {
        this.y += 5
      } else {
        this.y = CANVAS_SIZE.HEIGHT
        clearInterval(id)
      }
    }, timeout)
  }

  destroy() {
    return new Promise((resolve) => {
      this.img = laserGreenShot
      this.width = 98
      this.height = 95

      setTimeout(() => {
        this.dead = true
        resolve()
      }, timeout)
    })
  }

  isDestroying() {
    return this.img === laserGreenShot || this.dead
  }
}

const MAX_PER_ROW = 5
const COLUMN_GAP = 98
const ROW_GAP = 50
const ENEMY_WIDTH = MAX_PER_ROW * COLUMN_GAP

export const FORMATION_TYPE = {
  SQUARE: 'SQUARE',
  TRIANGLE: 'TRIANGLE',
}

/**
 *
 * @param {'SQUARE' | 'TRIANGLE'} formation
 */
export default function createEnemies(formation = FORMATION_TYPE.SQUARE) {
  const START_X = (CANVAS_SIZE.WIDTH - ENEMY_WIDTH) / 2
  const enemies = []

  switch (formation) {
    case FORMATION_TYPE.SQUARE:
      const STOP_X = START_X + ENEMY_WIDTH

      for (let x = START_X; x < STOP_X; x += COLUMN_GAP) {
        for (let y = 0; y < ROW_GAP * MAX_PER_ROW; y += ROW_GAP) {
          const enemy = new Enemy(x, y)
          enemy.img = enemyImg
          enemies.push(enemy)
        }
      }
    case FORMATION_TYPE.TRIANGLE:
      for (let row = 0; row < MAX_PER_ROW; row++) {
        const numEnemies = MAX_PER_ROW - row
        const rowWidth = numEnemies * COLUMN_GAP
        const rowStartX = (CANVAS_SIZE.WIDTH - rowWidth) / 2

        for (let x = rowStartX; x < rowStartX + rowWidth; x += COLUMN_GAP) {
          const enemy = new Enemy(x, row * ROW_GAP)
          enemy.img = enemyImg
          enemies.push(enemy)
        }
      }
      return enemies
    default:
      throw new Error('Invalid formation type')
  }
}
