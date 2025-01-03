function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
  })
}

const MONSTERS_MAX_PER_ROW = 5
const MONSTERS_COLUMN_GAP = 98
const MONSTERS_ROW_GAP = 50
const MONSTER_WIDTH = MONSTERS_MAX_PER_ROW * MONSTERS_COLUMN_GAP

function createEnemies1(ctx, canvas, enemyImg) {
  const START_X = (canvas.width - MONSTER_WIDTH) / 2
  const STOP_X = START_X + MONSTER_WIDTH

  for (let x = START_X; x < STOP_X; x += MONSTERS_COLUMN_GAP) {
    for (
      let y = 0;
      y < MONSTERS_ROW_GAP * MONSTERS_MAX_PER_ROW;
      y += MONSTERS_ROW_GAP
    ) {
      ctx.drawImage(enemyImg, x, y)
    }
  }
}

function createEnemies2(ctx, canvas, enemyImg) {
  const START_X = (canvas.width - MONSTER_WIDTH) / 2

  for (let row = 0; row < MONSTERS_MAX_PER_ROW; row++) {
    const numEnemies = MONSTERS_MAX_PER_ROW - row
    const rowWidth = numEnemies * MONSTERS_COLUMN_GAP
    const rowStartX = (canvas.width - rowWidth) / 2

    for (
      let x = rowStartX;
      x < rowStartX + rowWidth;
      x += MONSTERS_COLUMN_GAP
    ) {
      ctx.drawImage(enemyImg, x, row * MONSTERS_ROW_GAP)
    }
  }
}

window.onload = async () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const heroImg = await loadTexture('assets/player.png')
  const enemyImg = await loadTexture('assets/enemyShip.png')
  const starBackground = await loadTexture('assets/starBackground.png')

  const pattern = ctx.createPattern(starBackground, 'repeat')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(
    heroImg,
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  )
  createEnemies2(ctx, canvas, enemyImg)
}
