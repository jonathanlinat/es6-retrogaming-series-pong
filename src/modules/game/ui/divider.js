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

import Rect from '../../engine/geometry'
import Drawing from '../../engine/drawing'

export default class Divider extends Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0, color = '') {
    super(positionX, positionY, sizeX, sizeY)

    this.color = color

    this.drawing = new Drawing()
  }

  render (canvas = {}) {
    const dashedLines = []

    for (let i = 0; i < canvas.height; i++) {
      dashedLines.push(
        new Divider(this.positionX, (i * this.height) * (this.height / (this.height / 2)), this.width, this.height)
      )
    }

    dashedLines.forEach((dashedLine = {}) => this.drawing.drawRect(canvas, dashedLine.left, dashedLine.top, dashedLine.width, dashedLine.height, this.color))
  }
}