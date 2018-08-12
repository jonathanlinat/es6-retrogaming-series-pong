/*
 * MIT License
 *
 * Copyright (c) 2018 Jonathan Linat <https://www.github.com/jonathanlinat>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Updater from '../utils/updater'

export default class Gameloop {
  constructor (canvas = {}, ball = {}, players = [], scoreboard = {}, divider = {}, unscrambler = {}, collision = {}) {
    this.canvas = canvas
    this.ball = ball
    this.players = players
    this.scoreboard = scoreboard
    this.divider = divider
    this.unscrambler = unscrambler
    this.collision = collision

    this.updater = new Updater(this.loop.bind(this))

    this.updater.performAnimation()
  }

  loop (delta = 0) {
    this.canvas.clear()

    this.unscrambler.render(
      this.canvas,
      [
        `Rendering performance: ${this.updater.calculateFramesPerSecond(delta)} fps, ${this.updater.calculateMillisecondsPerFrame(delta)} mspf`,
        `Canvas Size: ${this.canvas.width}, ${this.canvas.height}`,
        `Ball Position: ${this.ball.positionX}, ${this.ball.positionY}`,
        `Ball Velocity: ${this.ball.velocityX}, ${this.ball.velocityY}`,
        `Player 1 Position: ${this.players[0].positionX}, ${this.players[0].positionY}`,
        `Player 2 Position: ${this.players[1].positionX}, ${this.players[1].positionY}`
      ]
    )

    this.ball.setPositionOverTime(delta)

    this.collision.detect(this.ball, this.canvas)
    this.players.forEach(player => this.collision.detect(this.ball, player))
    this.players.forEach(player => this.collision.detect(player, this.canvas))

    this.ball.render(this.canvas)
    this.players.forEach((player, index) => player.render(this.canvas, index))
    this.players.forEach((player, index, _player) => this.scoreboard.render(this.canvas, _player, index))
    this.divider.render(this.canvas)
  }
}
