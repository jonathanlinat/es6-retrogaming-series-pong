import Canvas from './modules/utils/canvas'
import Gameloop from './modules/logic/gameloop'
import Ball from './modules/elements/ball'
import Score from './modules/elements/score'
import Player from './modules/elements/player'
import Divider from './modules/elements/divider'

class Game {
  constructor () {
    this.canvas = new Canvas('2d', 640, 480, 'black')
    this.ball = new Ball((this.canvas.centerX), (this.canvas.height * (Math.random() * ((0.9 - 0.1) + 0.1))), 6, 6, 250)
    this.score = new Score(8, 4, 11)
    this.players = [
      new Player(96, (this.canvas.centerY), 6, 24),
      new Player((this.canvas.width - 96), (this.canvas.centerY), 6, 24)
    ]
    this.divider = new Divider((this.canvas.centerX), (this.canvas.centerY), 2, 8)
    this.gameloop = new Gameloop(this.canvas, this.ball, this.players, this.score, this.divider)
  }

  initialize () {
    this.canvas.create()
    this.gameloop.animate()
  }
}

(function () {
  new Game().initialize()
})()
