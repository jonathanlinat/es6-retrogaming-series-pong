import Drawing from './drawing'

export default class Debugger {
  constructor () {
    this.activated = false
    this.drawing = new Drawing()
  }

  activate () {
    this.activated = true
  }

  render (canvas = {}, elements = []) {
    if (this.activated) elements.forEach((element, index) => this.drawing.drawText(canvas, element, 20, 20 * (index + 1) + 10))
  }
}
