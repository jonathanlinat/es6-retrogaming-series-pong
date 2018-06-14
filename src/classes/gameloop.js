import Updater from './utils/updater'

export default class Gameloop {
  constructor (canvas = {}, ball = {}, players = {}, score = {}, divider = {}) {
    this.canvas = canvas
    this.ball = ball
    this.players = players
    this.score = score
    this.divider = divider

    this.updater = new Updater(this.clear.bind(this), this.render.bind(this))
  }

  update () {
    this.updater.update()
  }

  clear () {
    this.ball.clear(this.canvas)
    this.players.forEach(player => player.clear(this.canvas))
    this.score.clear(this.canvas)
    this.divider.clear(this.canvas)
  }

  render (time = 0) {
    this.ball.render(this.canvas)
    this.ball.positionOverTime(time)
    this.players.forEach((paddle, index) => paddle.render(this.canvas, index))
    this.players.forEach((player, index, _player) => this.score.render(this.canvas, _player, index))
    this.divider.render(this.canvas)
  }
}
