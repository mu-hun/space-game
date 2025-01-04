import Entity from './entity.js'
import { playerImg } from '../assets/index.js'

import CANVAS_SIZE from '../canvasSize.js'

class Player extends Entity {
  constructor(x, y) {
    super(x, y)
    this.width = 99
    this.height = 75

    this.type = 'Player'

    this.speed = { x: 0, y: 0 }
  }
}

export default function createPlayer() {
  const player = new Player(
    CANVAS_SIZE.WIDTH / 2 - 45,
    CANVAS_SIZE.HEIGHT - CANVAS_SIZE.HEIGHT / 4
  )
  player.img = playerImg
  return player
}
