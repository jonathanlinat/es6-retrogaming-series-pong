import Rect, { Vect } from './../utils/geometry'
import Drawing from './../utils/drawing'

export default class Ball extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, defaultVelocity = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.defaultVelocity = defaultVelocity
    this.randomVelocityX = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
    this.randomVelocityY = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)

    this.velocity = new Vect(this.randomVelocityX, this.randomVelocityY)
    this.drawing = new Drawing()
  }

  set velocityX (value = 0) { this.velocity.x = value }
  set velocityY (value = 0) { this.velocity.y = value }
  get velocityX () { return this.velocity.x }
  get velocityY () { return this.velocity.y }

  positionOverTime (time = 0) {
    this.positionX += this.velocityX * time
    this.positionY += this.velocityY * time
  }

  setRandomVelocity () {
    this.velocityX = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
    this.velocityY = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
  }

  resetPositionAndVelocity (canvas = {}) {
    this.positionX = canvas.centerX
    this.positionY = canvas.height * (Math.random() * ((0.9 - 0.1) + 0.1))

    this.velocityX = this.velocityY = 0
  }

  render (canvas = {}) {
    this.drawing.drawRect(canvas, this.left, this.top, this.width, this.height)
  }
}
