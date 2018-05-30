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

  get objectWidth () { return this.size.x }
  get objectHeight () { return this.size.y }

  get objectTop () { return this.position.y - (this.size.y / 2) }
  get objectLeft () { return this.position.x - (this.size.x / 2) }
  get objectRight () { return this.position.x + (this.size.x / 2) }
  get objectBottom () { return this.position.y + (this.size.y / 2) }

  get objectPositionX () { return this.position.x }
  get objectPositionY () { return this.position.y }
}
