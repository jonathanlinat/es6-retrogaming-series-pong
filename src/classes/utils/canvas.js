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

  get context () { return this.canvasContext }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  get halfWidth () { return this.canvas.width / 2 }
  get halfHeight () { return this.canvas.height / 2 }

  create () {
    document.addEventListener('load', this.canvas)
  }
}
