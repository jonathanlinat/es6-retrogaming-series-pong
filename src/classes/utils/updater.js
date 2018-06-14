export default class Updater {
  constructor (clear, render) {
    this.clear = clear
    this.render = render
    this.lastTime = 0
  }

  update (time = 0) {
    requestAnimationFrame(this.update.bind(this))

    if (this.lastTime) {
      this.clear()
      this.render((time - this.lastTime) / 1000)
    }
    this.lastTime = time
  }
}
