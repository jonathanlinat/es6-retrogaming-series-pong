import Rect from './utils/geometry'
import Drawing from './utils/drawing'

export default class Divider extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    super(positionX, positionY, sizeX, sizeY)
  }

  render (canvas = {}) {
    const drawing = new Drawing()
    const dashedLines = []

    for (let i = 0; i < (this.positionY / this.height); i++) {
      dashedLines.push(
        new Divider(this.positionX, (i * this.height) * (this.height / (this.height / 2)), this.width, this.height)
      )
    }

    dashedLines.forEach(dashedLine => drawing.drawRect(canvas, dashedLine.left, dashedLine.top, dashedLine.width, dashedLine.height))
  }
}
