import { lifeImg } from './assets/index.js'

import CANVAS_SIZE from './canvasSize.js'

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} life
 */
export function drawLife(ctx, life) {
  const START_POS = CANVAS_SIZE.WIDTH - 180
  for (let i = 0; i < life; i++) {
    ctx.drawImage(lifeImg, START_POS + 45 * (i + 1), CANVAS_SIZE.HEIGHT - 37)
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} points
 */
export function drawPoints(ctx, points) {
  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'
  ctx.textAlign = 'left'
  ctx.fillText(`점수: ${points}`, 10, CANVAS_SIZE.HEIGHT - 20)
}

export const RESULT = {
  WIN: 'WIN',
  LOSE: 'LOSE',
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {'WIN' | 'LOSE'} status
 * @param {number} requestId
 */
export function endGame(ctx, status, requestId) {
  cancelAnimationFrame(requestId)

  ctx.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT)

  switch (status) {
    case RESULT.WIN:
      displayMessage(
        ctx,
        '승리!!! - 새로운 게임을 시작하려면 [Enter] 키를 누르세요.',
        'green'
      )
      return
    case RESULT.LOSE:
      displayMessage(
        ctx,
        '죽었습니다!!! - 새로운 게임을 시작하려면 [Enter] 키를 누르세요.',
        'red'
      )
      return
    default:
      throw new Error('Invalid status')
  }
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} message
 * @param {string} color
 */
function displayMessage(ctx, message, color) {
  ctx.font = '30px Arial'
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.fillText(message, CANVAS_SIZE.WIDTH / 2, CANVAS_SIZE.HEIGHT / 2)
}
