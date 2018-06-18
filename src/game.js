import Canvas from './modules/utils/canvas'
import Gameloop from './modules/logic/gameloop'
import Ball from './modules/elements/ball'
import Score from './modules/elements/score'
import Paddle from './modules/elements/paddle'
import Divider from './modules/elements/divider'

class Game {
  constructor () {
    this.canvas = new Canvas('2d', 640, 480, 'black')
    this.ball = new Ball((this.canvas.width / 2), (this.canvas.height / 2), 6, 6, 200)
    this.score = new Score(8, 4)
    this.players = [
      new Paddle(96, (this.canvas.height / 2), 6, 24),
      new Paddle((this.canvas.width - 96), (this.canvas.height / 2), 6, 24)
    ]
    this.divider = new Divider((this.canvas.width / 2), (this.canvas.height / 2), 2, 8)
    this.gameloop = new Gameloop(this.canvas, this.ball, this.players, this.score, this.divider)
  }

  initialize () {
    this.canvas.create()
    this.gameloop.update()
  }
}

;(function () {
  new Game().initialize()
})()
