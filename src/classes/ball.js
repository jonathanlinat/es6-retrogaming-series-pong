import Rect, { Vect } from './utils/geometry'
import Drawing from './utils/drawing'

export default class Ball extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, velocityX = 0, velocityY = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.velocity = new Vect(velocityX, velocityY)
  }

  render (canvas = {}) {
    const drawing = new Drawing()
    drawing.drawRect(canvas, this.objectLeft, this.objectTop, this.objectWidth, this.objectHeight)
  }
}
