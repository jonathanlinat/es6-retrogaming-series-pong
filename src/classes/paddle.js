import Rect from './utils/geometry'
import Drawing from './utils/drawing'

export default class Paddle extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    super(positionX, positionY, sizeX, sizeY)
  }

  render (canvas = {}) {
    const drawing = new Drawing()
    drawing.drawRect(canvas, this.objectLeft, this.objectTop, this.objectWidth, this.objectHeight)
  }
}
