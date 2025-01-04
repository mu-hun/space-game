/**
 *
 * @param {string} path
 * @returns {Promise<HTMLImageElement>}
 */
export function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
  })
}

export class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  /**
   *
   * @param {string} message
   * @param {Function} listener
   */
  on(message, listener) {
    if (!this.listeners[message]) {
      this.listeners[message] = []
    }
    this.listeners[message].push(listener)
  }

  /**
   *
   * @param {string} message
   * @param {unknown} payload
   */
  emit(message, payload = null) {
    if (this.listeners[message]) {
      this.listeners[message].forEach((l) => l(message, payload))
    }
  }
}
