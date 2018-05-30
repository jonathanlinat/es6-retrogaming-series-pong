import Rect from './utils/geometry'
import Drawing from './utils/drawing'

export default class Divider extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    super(positionX, positionY, sizeX, sizeY)
  }

  render (canvas = {}) {
    const drawing = new Drawing()
    const dashedLines = []

    for (let i = 0; i < (this.objectPositionY / this.objectHeight); i++) {
      dashedLines.push(
        new Divider(this.objectPositionX, (i * this.objectHeight) * (this.objectHeight / (this.objectHeight / 2)), this.objectWidth, this.objectHeight)
      )
    }

    dashedLines.forEach(dashedLine => drawing.drawRect(canvas, dashedLine.objectLeft, dashedLine.objectTop, dashedLine.objectWidth, dashedLine.objectHeight))
  }
}
