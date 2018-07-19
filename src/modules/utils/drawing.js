export default class Drawing {
  drawRect (canvas = {}, positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    canvas.context.fillStyle = '#e8e8e8'
    canvas.context.fillRect(positionX, positionY, sizeX, sizeY)
  }

  clearRect (canvas = {}, positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    canvas.context.clearRect(positionX, positionY, sizeX, sizeY)
  }

  clearCanvas (canvas = {}) {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height)
  }
}
