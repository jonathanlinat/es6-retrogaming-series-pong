import Updater from '../utils/updater'
import Debugger from '../utils/debugger'
import Collision from './collision'

export default class Gameloop {
  constructor (canvas = {}, ball = {}, players = [], scoreboard = {}, divider = {}) {
    this.canvas = canvas
    this.ball = ball
    this.players = players
    this.scoreboard = scoreboard
    this.divider = divider

    this.updater = new Updater(this.loop.bind(this))
    this.debugger = new Debugger()
    this.collision = new Collision(this.canvas, this.ball, this.players)

    this.debugger.activate()
  }

  animate () {
    this.updater.performAnimation()
  }

  loop (time = 0) {
    this.canvas.clear()

    this.debugger.render(
      this.canvas,
      [
        [`Rendering performance: ${this.updater.calculateFps(time)} fps, ${this.updater.calculateAverageMs(time)} ms / frame`],
        [`Player 1 Position: ${this.players[0].positionX}, ${this.players[0].positionY}`],
        [`Player 2 Position: ${this.players[1].positionX}, ${this.players[1].positionY}`],
        [`Ball Position: ${this.ball.positionX}, ${this.ball.positionY}`],
        [`Ball Velocity: ${this.ball.velocityX}, ${this.ball.velocityY}`]
      ]
    )

    this.ball.setPositionOverTime(time)
    this.players.forEach(player => { player.positionY = this.ball.positionY })

    this.collision.detect(this.ball, this.canvas)
    this.players.forEach(player => this.collision.detect(this.ball, player))
    this.players.forEach(player => this.collision.detect(player, this.canvas))

    this.ball.render(this.canvas)
    this.players.forEach((player, index) => player.render(this.canvas, index))
    this.players.forEach((player, index, _player) => this.scoreboard.render(this.canvas, _player, index))
    this.divider.render(this.canvas)
  }
}
