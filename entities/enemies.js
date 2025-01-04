import { enemyImg } from '../assets/index.js'

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
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLCanvasElement} canvas
 * @param {'SQUARE' | 'TRIANGLE'} formation
 */
export function createEnemies(ctx, canvas, formation) {
  const START_X = (canvas.width - ENEMY_WIDTH) / 2

  if (formation === FORMATION_TYPE.SQUARE) {
    const STOP_X = START_X + ENEMY_WIDTH

    for (let x = START_X; x < STOP_X; x += COLUMN_GAP) {
      for (let y = 0; y < ROW_GAP * MAX_PER_ROW; y += ROW_GAP) {
        ctx.drawImage(enemyImg, x, y)
      }
    }
    return
  }

  if (formation === FORMATION_TYPE.TRIANGLE) {
    for (let row = 0; row < MAX_PER_ROW; row++) {
      const numEnemies = MAX_PER_ROW - row
      const rowWidth = numEnemies * COLUMN_GAP
      const rowStartX = (canvas.width - rowWidth) / 2

      for (let x = rowStartX; x < rowStartX + rowWidth; x += COLUMN_GAP) {
        ctx.drawImage(enemyImg, x, row * ROW_GAP)
      }
    }
    return
  }

  throw new Error('Invalid formation type')
}
