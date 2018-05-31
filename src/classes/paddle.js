import Rect from './utils/geometry'
import Drawing from './utils/drawing'

export default class Paddle extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.score = 0
  }

  render (canvas = {}, index = 0) {
    const drawing = new Drawing()
    drawing.drawRect(canvas, index === 0 ? this.left : this.right, this.top, this.width, this.height)
  }
}
