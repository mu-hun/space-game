export default class Entity {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
    this.dead = false
    this.type = ''
    this.width = 0
    this.height = 0
    this.img = undefined
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  getBoundingClientRect() {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width,
    }
  }

  /**
   *
   * @param {Entity} entity
   */
  isColliding(entity) {
    const rect1 = this.getBoundingClientRect()
    const rect2 = entity.getBoundingClientRect()
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    )
  }
}
