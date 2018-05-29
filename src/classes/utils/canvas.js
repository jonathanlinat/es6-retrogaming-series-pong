export default class Canvas {
  constructor (context = '', width = 0, height = 0, color = '') {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height

    this.canvasContext = this.canvas.getContext(context)
    this.canvasContext.globalAlpha = color ? 1 : 0
    this.canvasContext.fillStyle = color
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.width)

    document.body.appendChild(this.canvas)
  }

  getWidth () { return this.canvas.width }
  getHeight () { return this.canvas.height }
  getContext () { return this.canvasContext }

  render () {
    document.addEventListener('load', this.canvas)
  }
}
