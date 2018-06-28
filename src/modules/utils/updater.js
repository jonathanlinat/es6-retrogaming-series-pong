export default class Updater {
  constructor (callback) {
    this.callback = callback
    this.lastTime = 0
  }

  performAnimation (time = 0) {
    requestAnimationFrame(this.performAnimation.bind(this))

    if (this.lastTime) this.callback((time - this.lastTime) / 1000)

    this.lastTime = time
  }
}
