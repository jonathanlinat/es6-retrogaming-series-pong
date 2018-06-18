export default class Updater {
  constructor (render) {
    this.render = render
    this.lastTime = 0
  }

  performAnimation (time = 0) {
    requestAnimationFrame(this.performAnimation.bind(this))

    if (this.lastTime) {
      this.render((time - this.lastTime) / 1000)
    }

    this.lastTime = time
  }
}
