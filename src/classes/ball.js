import Rect, { Vect } from './utils/geometry'

export default class Ball extends Rect {
  constructor (positionX, positionY) {
    super(6, 6)

    this.position.x = positionX || 0
    this.position.y = positionY || 0

    this.velocity = new Vect()
    this.velocity.x = this.velocity.y = 0
  }
}
