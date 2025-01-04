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
