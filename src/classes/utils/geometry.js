export class Vect {
  constructor (axisX, axisY) {
    this.x = axisX || 0
    this.y = axisY || 0
  }
}

export default class Rect {
  constructor (sizeW, sizeH) {
    this.position = new Vect()

    this.size = new Vect(sizeW, sizeH)
  }

  get top () { return this.position.y - (this.size.y / 2) }
  get right () { return this.position.x + (this.size.x / 2) }
  get bottom () { return this.position.y + (this.size.y / 2) }
  get left () { return this.position.x - (this.size.x / 2) }
}
