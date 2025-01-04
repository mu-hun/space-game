import * as assets from './assets/index.js'
import * as enemies from './entities/enemies.js'

window.onload = async () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const pattern = ctx.createPattern(assets.starBackground, 'repeat')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(
    assets.heroImg,
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  )
  enemies.createEnemies(ctx, canvas, enemies.FORMATION_TYPE.SQUARE)
}
