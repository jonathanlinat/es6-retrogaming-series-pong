export default class Canvas {
  constructor (context = '', width = 0, height = 0, color = 'black') {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.color = color

    this.canvasContext = this.canvas.getContext(context)
    this.canvasContext.globalAlpha = this.canvas.color ? 1 : 0
    this.canvasContext.fillStyle = this.canvas.color
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.width)

    document.body.appendChild(this.canvas)
  }

  get context () { return this.canvasContext }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  create () {
    document.addEventListener('load', this.canvas)
  }
}
