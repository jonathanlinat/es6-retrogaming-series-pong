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

import Rect, { Vect } from '../utils/geometry'
import Drawing from '../utils/drawing'

export default class Ball extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, color = '', defaultVelocity = 0, velocityMultiplier = 0) {
    super(positionX, positionY, sizeX, sizeY)

    this.color = color
    this.defaultVelocity = defaultVelocity
    this.velocityMultiplier = velocityMultiplier
    this.randomVelocityX = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
    this.randomVelocityY = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)

    this.velocity = new Vect(this.randomVelocityX, this.randomVelocityY)
    this.drawing = new Drawing()
  }

  set velocityX (value = 0) { this.velocity.x = value | 0 }
  set velocityY (value = 0) { this.velocity.y = value | 0 }
  get velocityX () { return this.velocity.x }
  get velocityY () { return this.velocity.y }

  increaseVelocity () {
    this.velocityX = this.velocityX * this.velocityMultiplier
    this.velocityY = this.velocityY * this.velocityMultiplier
  }

  setPositionOverTime (time = 0) {
    this.positionX += this.velocityX * time
    this.positionY += this.velocityY * time
  }

  setCenteredPosition (canvas = {}) {
    this.positionX = canvas.centerX
    this.positionY = canvas.height * (Math.random() * ((0.9 - 0.1) + 0.1))
  }

  setRandomVelocity () {
    this.velocityX = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
    this.velocityY = this.defaultVelocity * (Math.random() > 0.5 ? 1 : -1)
  }

  render (canvas = {}) {
    this.drawing.drawRect(canvas, this.left, this.top, this.width, this.height, this.color)
  }
}
