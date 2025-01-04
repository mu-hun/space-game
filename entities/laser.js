import Entity from './entity.js'
import { laserImg } from '../assets/index.js'

export default class Laser extends Entity {
  constructor(x, y) {
    super(x, y)
    this.width = 9
    this.height = 33
    this.type = 'Laser'
    this.img = laserImg
    let id = setInterval(() => {
      if (this.y > 0) {
        this.y -= 15
      } else {
        this.dead = true
        clearInterval(id)
      }
    }, 100)
  }

  destroy() {
    this.dead = true
  }
}
