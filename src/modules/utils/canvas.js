import Drawing from './drawing'

export default class Canvas {
  constructor (context = '', width = 0, height = 0) {
    this.canvas = document.createElement('canvas')

    this.canvas.context = this.canvas.getContext(context)
    this.canvas.width = width
    this.canvas.height = height

    document.body.appendChild(this.canvas)

    this.drawing = new Drawing()
    this.drawing.drawRect(this.canvas, 0, 0, this.canvas.width, this.canvas.width, this.canvas.color)
  }

  get context () { return this.canvas.context }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  get top () { return this.canvas.height - this.canvas.height }
  get left () { return this.canvas.width - this.canvas.width }
  get right () { return this.canvas.width }
  get bottom () { return this.canvas.height }

  get centerX () { return this.canvas.width / 2 }
  get centerY () { return this.canvas.height / 2 }

  clear () {
    this.drawing.clearCanvas(this.canvas)
  }

  create () {
    document.addEventListener('load', this.canvas)
  }
}
