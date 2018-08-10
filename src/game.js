/*
 * MIT License
 *
 * Copyright (c) 2018 Jonathan Linat <https://www.github.com/jonathanlinat>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Canvas from './modules/utils/canvas'
import Ball from './modules/elements/ball'
import Player from './modules/elements/player'
import Divider from './modules/ui/divider'
import Scoreboard from './modules/ui/scoreboard'
import Controls from './modules/utils/controls'
import Unscrambler from './modules/utils/unscrambler'
import Gameloop from './modules/logic/gameloop'

class Game {
  constructor () {
    this.canvas = new Canvas('2d', 640, 480)
    this.ball = new Ball(this.canvas.centerX, this.canvas.height * (Math.random() * ((0.9 - 0.1) + 0.1)), 6, 6, '#e8e8e8', 250, 1.025)
    this.players = [
      new Player(96, this.canvas.centerY, 6, 24, '#e8e8e8', 11),
      new Player(this.canvas.width - 96, this.canvas.centerY, 6, 24, '#e8e8e8', 11)
    ]
    this.divider = new Divider(this.canvas.centerX - 16, this.canvas.centerY, 2, 6, '#e8e8e8')
    this.scoreboard = new Scoreboard(6, 4, '#e8e8e8')
    this.controls = new Controls()
    this.unscrambler = new Unscrambler()
    this.gameloop = new Gameloop(this.canvas, this.ball, this.players, this.scoreboard, this.divider, this.unscrambler)

    this.unscrambler.activate()
  }

  initialize () {
    this.canvas.render()
    this.gameloop.animate()
  }
}

(function () {
  new Game().initialize()
})()
