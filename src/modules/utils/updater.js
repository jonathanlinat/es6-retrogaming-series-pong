export default class Updater {
  constructor (callback) {
    this.callback = callback
    this.lastTime = 0
  }

  calculateFps (time = 0, lastTime = 0) {
    return Number(1 / (time - lastTime)).toFixed(2)
  }

  calculateAverageMs (time = 0, lastTime = 0) {
    return Number((time - lastTime) * 1000).toFixed(2)
  }

  performAnimation (time = 0) {
    requestAnimationFrame(this.performAnimation.bind(this))

    if (this.lastTime) this.callback((time - this.lastTime) / 1000)

    this.lastTime = time
  }
}
