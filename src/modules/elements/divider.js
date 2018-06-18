import Rect from './../utils/geometry'
import Drawing from './../utils/drawing'

export default class Divider extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.drawing = new Drawing()
  }

  render (canvas = {}) {
    this.dashedLines = []

    for (let i = 0; i < canvas.height; i++) {
      this.dashedLines.push(
        new Divider(this.positionX, (i * this.height) * (this.height / (this.height / 2)), this.width, this.height)
      )
    }

    this.dashedLines.forEach(dashedLine => this.drawing.drawRect(canvas, dashedLine.left, dashedLine.top, dashedLine.width, dashedLine.height))
  }
}
