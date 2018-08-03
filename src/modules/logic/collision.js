/*
 * MIT License
 *
 * Copyright (c) 2018 Jonathan Linat
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

import Gamelogic from './gamelogic'
import Sound from '../utils/sound'

export default class Collision {
  constructor (canvas = {}, ball = {}, players = []) {
    this.canvas = canvas
    this.ball = ball
    this.players = players

    this.gamelogic = new Gamelogic(this.canvas, this.ball, this.players)
    this.sound = new Sound()

    this.sound.disable()
  }

  detect (collider = {}, collided = {}) {
    if (this.players.includes(collider) && collided === this.canvas) {
      if (collider.top < 16) {
        collider.positionY = (collider.size.y / 2) + 16
      } else if (collider.bottom > collided.height - 16) {
        collider.positionY = collided.height - (collider.size.y / 2) - 16
      }
    }

    if (collider === this.ball && collided === this.canvas) {
      if (collider.left < 32 || collider.right > (collided.width - 32)) {
        this.sound.generate('square', 257, 490)
        if (collider.left < 32) {
          this.gamelogic.startNewRound(1)
        } else {
          this.gamelogic.startNewRound(0)
        }
      } else if (collider.top < 0 || collider.bottom > collided.height) {
        this.sound.generate('square', 16, 226)
        collider.velocityY = -collider.velocityY
      }
    }

    if (collider === this.ball && this.players.includes(collided)) {
      if (collider.right > collided.left && collider.left < collided.right && collider.bottom > collided.top && collider.top < collided.bottom) {
        this.sound.generate('square', 96, 459)
        collider.increaseVelocity()
        if (collider.right > collided.left && collider.left < collided.right) {
          collider.velocityX = -collider.velocityX
        } else if (collider.top > collided.bottom && collider.bottom < collided.top) {
          collider.velocityY = -collider.velocityY
        }
      }
    }
  }
}
