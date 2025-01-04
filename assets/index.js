import { loadTexture } from '../utils.js'

export const playerImg = await loadTexture(import.meta.resolve('./player.png'))
export const enemyImg = await loadTexture(
  import.meta.resolve('./enemyShip.png')
)
export const starBackground = await loadTexture(
  import.meta.resolve('./starBackground.png')
)
export const laserImg = await loadTexture(import.meta.resolve('./laserRed.png'))
export const laserGreenShot = await loadTexture(
  import.meta.resolve('./laserGreenShot.png')
)
export const lifeImg = await loadTexture(import.meta.resolve('./life.png'))
