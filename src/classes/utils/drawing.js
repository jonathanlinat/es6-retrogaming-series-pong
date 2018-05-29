export default class Drawing {
  drawRect (context, object) {
    context.fillStyle = 'white'
    context.fillRect(object.left, object.top, object.size.x, object.size.y)
  }

  clearCanvas (canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}
