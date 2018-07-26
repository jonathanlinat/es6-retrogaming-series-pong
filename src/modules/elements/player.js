import Rect from '../utils/geometry'
import Drawing from '../utils/drawing'

export default class Player extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, color = '', maxHiScore = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.color = color
    this.maxHiScore = maxHiScore
    this.score = 0

    this.drawing = new Drawing()
  }

  increaseScore () {
    this.score++
  }

  resetScore () {
    this.score = 0
  }

  checkReachedMaxHiScore () {
    return this.score === this.maxHiScore
  }

  render (canvas = {}, index = 0) {
    this.drawing.drawRect(canvas, index === 0 ? this.positionX : (this.positionX - this.width), this.top, this.width, this.height, this.color)
  }
}
