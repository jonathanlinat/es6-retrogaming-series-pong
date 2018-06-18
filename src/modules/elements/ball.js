import Rect, { Vect } from './../utils/geometry'
import Drawing from './../utils/drawing'

export default class Ball extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, defaultVelocity = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.randomVelocityX = defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
    this.randomVelocityY = defaultVelocity * (Math.random() > 0.5 ? 1 : -1)

    this.velocity = new Vect(this.randomVelocityX, this.randomVelocityY)
    this.drawing = new Drawing()
  }

  positionOverTime (time = 0) {
    this.position.x += this.velocity.x * time
    this.position.y += this.velocity.y * time
  }

  render (canvas = {}) {
    this.drawing.drawRect(canvas, this.left, this.top, this.width, this.height)
  }
}
