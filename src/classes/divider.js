import Rect from './utils/geometry'

export default class Divider extends Rect {
  constructor (positionX, positionY) {
    super(2, 8)

    this.position.x = positionX || 0
    this.position.y = positionY || 0
  }

  render () {}
}
