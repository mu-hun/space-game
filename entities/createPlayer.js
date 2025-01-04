import Entity from './entity.js'
import Laser from './laser.js'
import { playerImg } from '../assets/index.js'

import CANVAS_SIZE from '../canvasSize.js'

const timeout = 200

class Player extends Entity {
  constructor() {
    const [x, y] = getInitialPosition()
    super(x, y)

    this.width = 99
    this.height = 75

    this.type = 'Player'

    this.speed = { x: 20, y: 20 }
    this.img = playerImg

    this.cooldown = 0

    this.leftLaser = []
    this.rightLaser = []

    this.life = 3
    this.points = 0

    this.autoFireIntervalId = null
  }

  reset() {
    this.dead = false

    const [x, y] = getInitialPosition()
    this.x = x
    this.y = y

    this.cooldown = 0

    this.leftLaser = []
    this.rightLaser = []

    this.life = 3
    this.points = 0

    clearInterval(this.autoFireIntervalId)
  }

  decrementLife() {
    this.life--
    if (this.life === 0) {
      this.dead = true
    }
  }
  incrementPoints() {
    this.points += 100
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

  startAutoFire() {
    this.autoFireIntervalId = setInterval(() => {
      this.leftLaser.push(new Laser(this.x, this.y - 10))
      this.rightLaser.push(new Laser(this.x + 90, this.y - 10))
    }, timeout)
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  drawAutoFire(ctx) {
    this.leftLaser = this.leftLaser.filter(
      (laser) => laser.y > 0 && !laser.dead
    )
    for (const laser of this.leftLaser) {
      laser.draw(ctx)
    }

    this.rightLaser = this.rightLaser.filter(
      (laser) => laser.y > 0 && !laser.dead
    )
    for (const laser of this.rightLaser) {
      laser.draw(ctx)
    }
  }
}

function getInitialPosition() {
  return [
    CANVAS_SIZE.WIDTH / 2 - 45,
    CANVAS_SIZE.HEIGHT - CANVAS_SIZE.HEIGHT / 4,
  ]
}

export default function createPlayer() {
  return new Player()
}
