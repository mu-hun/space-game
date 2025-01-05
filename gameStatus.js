import { lifeImg } from './assets/index.js'

import CANVAS_SIZE from './canvasSize.js'

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} life
 */
export function drawLife(ctx, life) {
  const START_POS = CANVAS_SIZE.WIDTH
  for (let i = 0; i < life; i++) {
    ctx.drawImage(lifeImg, START_POS - 45 * (i + 1), CANVAS_SIZE.HEIGHT - 37)
  }
}

const OFFSET = {
  X: 10,
  Y: 20,
}

const fontSize = 30

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} points
 */
export function drawPoints(ctx, points) {
  ctx.font = `${fontSize}px sans-serif`
  ctx.fillStyle = 'red'
  ctx.textAlign = 'left'
  ctx.fillText(`점수: ${points}`, OFFSET.X, CANVAS_SIZE.HEIGHT - OFFSET.Y)
}

export function drawStage(ctx, stage) {
  ctx.font = `${fontSize} sans-serif`
  ctx.fillStyle = 'green'
  ctx.textAlign = 'left'
  ctx.fillText(
    `단계: ${stageToLocaleString[stage]}`,
    OFFSET.X,
    CANVAS_SIZE.HEIGHT - OFFSET.Y - fontSize
  )
}

export const RESULT = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  MISSED: 'MISSED',
}

export const STAGES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
}

const stageToLocaleString = {
  [STAGES.EASY]: '쉬움',
  [STAGES.MEDIUM]: '보통',
  [STAGES.HARD]: '어려움',
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {'WIN' | 'LOSE' | 'MISSED'} status
 * @param {number} point
 * @param { 'EASY' | 'MEDIUM' | 'HARD'} stage
 * @param {number} requestId
 */
export function endGame(ctx, status, point, stage, requestId) {
  cancelAnimationFrame(requestId)

  ctx.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT)

  switch (status) {
    case RESULT.WIN:
      const message =
        stage === STAGES.HARD
          ? `게임 클리어!!! - 최종 획득 점수: ${point}점`
          : `${stageToLocaleString[stage]} 단계 통과!!! - 다음 단계로 넘어가려면 [Enter] 키를 누르세요.`
      displayMessage(ctx, message, 'green')
      return
    case RESULT.LOSE:
      displayMessage(
        ctx,
        `죽었습니다!!! - 새로운 게임을 시작하려면 [Enter] 키를 누르세요.\n - 시도한 단계: ${stageToLocaleString[stage]}`,
        'red'
      )
      return
    case RESULT.MISSED:
      displayMessage(
        ctx,
        `놓쳤습니다!!! - 게임을 다시 시작하려면 [Enter] 키를 누르세요.\n - 시도한 단계: ${stageToLocaleString[stage]}`,
        'fuchsia'
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
