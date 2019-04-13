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

import Rect from 'Modules/engine/geometry'
import Drawing from 'Modules/engine/drawing'

export default class Paddle extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, color = '', maxHiScore = 0, scoreModifier = 0, positionModifier = 0, mappedKeys = []) {
    super(positionX, positionY, sizeX, sizeY)

    this.color = color
    this.maxHiScore = maxHiScore
    this.scoreModifier = scoreModifier
    this.positionModifier = positionModifier
    this.mappedKeys = mappedKeys

    this.score = 0

    this.drawing = new Drawing()
  }

  increaseScore () {
    this.score += this.scoreModifier
  }

  resetScore () {
    this.score = 0
  }

  checkReachedMaxHiScore () {
    return this.score === this.maxHiScore
  }

  move (handledKeys = []) {
    this.mappedKeys.forEach((mappedKey = '', index = 0) => { if (handledKeys[mappedKey]) this.positionY = (index === 0) ? this.positionY - this.positionModifier : this.positionY + this.positionModifier })
  }

  render (canvas = {}, index = 0) {
    this.drawing.drawRect(canvas, (index === 0) ? this.positionX : this.positionX - this.width, this.top, this.width, this.height, this.color)
  }
}
