import Rect from './utils/geometry'

export default class Paddle extends Rect {
  constructor (positionX, positionY) {
    super(6, 24)

    this.position.x = positionX || 0
    this.position.y = positionY || 0
  }

  render () {}
}
