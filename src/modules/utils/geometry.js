export class Vect {
  constructor (axisX = 0, axisY = 0) {
    this.x = axisX
    this.y = axisY
  }
}

export default class Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    this.position = new Vect(positionX, positionY)
    this.size = new Vect(sizeX, sizeY)
  }

  get width () { return this.size.x }
  get height () { return this.size.y }

  set positionX (value = 0) { this.position.x = value | 0 }
  set positionY (value = 0) { this.position.y = value | 0 }
  get positionX () { return this.position.x }
  get positionY () { return this.position.y }

  get top () { return this.position.y - (this.size.y / 2) }
  get left () { return this.position.x - (this.size.x / 2) }
  get right () { return this.position.x + (this.size.x / 2) }
  get bottom () { return this.position.y + (this.size.y / 2) }
}
