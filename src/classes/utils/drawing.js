export default class Drawing {
  drawRect (canvas = {}, positionX = '', positionY = '', sizeX = '', sizeY = '') {
    canvas.context.fillStyle = 'white'
    canvas.context.fillRect(positionX, positionY, sizeX, sizeY)
  }

  clearCanvas (canvas = {}) {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height)
  }
}
