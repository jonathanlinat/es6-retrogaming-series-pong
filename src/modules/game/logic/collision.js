/*
 * MIT License
 *
 * Copyright (c) 2018-2019 Jonathan Linat <https://www.github.com/jonathanlinat>
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

export default class Collision {
  constructor (canvas = {}, ball = {}, paddles = [], sound = {}, gamelogic = {}) {
    this.canvas = canvas
    this.ball = ball
    this.paddles = paddles
    this.sound = sound
    this.gamelogic = gamelogic
  }

  detect (collider = {}, collided = {}) {
    if (this.paddles.includes(collider) && collided === this.canvas) {}

    if (collider === this.ball && collided === this.canvas) {
      if (collider.top < collided.top || collider.bottom > collided.bottom) {
        collider.velocityY = -collider.velocityY
      } else if (collider.left < (collided.left + 32) || collider.right > (collided.right - 32)) {
        collider.velocityX = -collider.velocityX
      }
    }

    if (collider === this.ball && this.paddles.includes(collided)) {}
  }
}
