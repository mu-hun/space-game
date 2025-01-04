import { loadTexture } from '../utils.js'

export const playerImg = await loadTexture(import.meta.resolve('./player.png'))
export const enemyImg = await loadTexture(
  import.meta.resolve('./enemyShip.png')
)
export const starBackground = await loadTexture(
  import.meta.resolve('./starBackground.png')
)
