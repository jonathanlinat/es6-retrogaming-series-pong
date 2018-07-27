import Canvas from './modules/utils/canvas'
import Gameloop from './modules/logic/gameloop'
import Ball from './modules/elements/ball'
import Scoreboard from './modules/ui/scoreboard'
import Player from './modules/elements/player'
import Divider from './modules/ui/divider'

class Game {
  constructor () {
    this.canvas = new Canvas('2d', 640, 480)
    this.ball = new Ball((this.canvas.centerX), (this.canvas.height * (Math.random() * ((0.9 - 0.1) + 0.1))), 6, 6, '#e8e8e8', 250, 1.025)
    this.scoreboard = new Scoreboard(8, 4, '#e8e8e8')
    this.players = [
      new Player(96, (this.canvas.centerY), 6, 24, '#e8e8e8', 11),
      new Player((this.canvas.width - 96), (this.canvas.centerY), 6, 24, '#e8e8e8', 11)
    ]
    this.divider = new Divider((this.canvas.centerX), (this.canvas.centerY), 2, 8, '#e8e8e8')
    this.gameloop = new Gameloop(this.canvas, this.ball, this.players, this.scoreboard, this.divider)
  }

  initialize () {
    this.canvas.create()
    this.gameloop.animate()
  }
}

(function () {
  new Game().initialize()
})()
