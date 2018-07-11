import Rect from './../utils/geometry'
import Drawing from './../utils/drawing'

export default class Player extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.score = 0

    this.drawing = new Drawing()
  }

  render (canvas = {}, index = 0) {
    this.drawing.drawRect(canvas, index === 0 ? this.positionX : (this.positionX - this.width), this.top, this.width, this.height)
  }
}