import Updater from '../utils/updater'
import Collision from '../logic/collision'

export default class Gameloop {
  constructor (canvas = {}, ball = {}, players = [], score = {}, divider = {}) {
    this.canvas = canvas
    this.ball = ball
    this.players = players
    this.score = score
    this.divider = divider

    this.updater = new Updater(this.loop.bind(this))
    this.collision = new Collision()
  }

  animate () {
    this.updater.performAnimation()
  }

  loop (time = 0) {
    this.canvas.clear()

    this.ball.positionOverTime(time)
    this.collision.detect(this.ball, this.canvas)
    this.players.forEach(player => this.collision.detect(this.ball, player))
    this.players.forEach(player => this.collision.detect(player, this.canvas))

    this.ball.render(this.canvas)
    this.players.forEach((player, index) => player.render(this.canvas, index))
    this.players.forEach((player, index, _player) => this.score.render(this.canvas, _player, index))
    this.divider.render(this.canvas)
  }
}
