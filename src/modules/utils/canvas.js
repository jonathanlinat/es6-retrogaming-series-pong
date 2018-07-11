import Drawing from './drawing'

export default class Canvas {
  constructor (context = '', width = 0, height = 0, color = '') {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.color = color

    this.canvasContext = this.canvas.getContext(context)
    this.canvasContext.globalAlpha = this.canvas.color ? 1 : 0
    this.canvasContext.fillStyle = this.canvas.color
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.width)

    this.name = this.constructor.name.toLowerCase()

    document.body.appendChild(this.canvas)

    this.drawing = new Drawing()
  }

  get context () { return this.canvasContext }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  get top () { return this.canvas.height - this.canvas.height }
  get left () { return this.canvas.width - this.canvas.width }
  get right () { return this.canvas.width }
  get bottom () { return this.canvas.height }

  clear () {
    this.drawing.clearCanvas(this)
  }

  create () {
    document.addEventListener('load', this.canvas)
  }
}
