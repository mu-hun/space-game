import Entity from './entity.js'
import Laser from './laser.js'
import { playerImg } from '../assets/index.js'

import CANVAS_SIZE from '../canvasSize.js'

const timeout = 200

class Player extends Entity {
  constructor(x, y) {
    super(x, y)
    this.width = 99
    this.height = 75

    this.type = 'Player'

    this.speed = { x: 0, y: 0 }

    this.cooldown = 0
  }

  fire() {
    const laser = new Laser(this.x + 45, this.y - 10)
    this.cooldown = timeout

    let id = setInterval(() => {
      if (this.cooldown > 0) {
        this.cooldown -= 100
        if (this.cooldown === 0) {
          clearInterval(id)
        }
      }
    }, timeout)

    return laser
  }

  canFire() {
    return this.cooldown === 0
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
