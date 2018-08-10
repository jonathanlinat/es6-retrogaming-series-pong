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

export class Vect {
  constructor (axisX = 0, axisY = 0) {
    this.x = axisX
    this.y = axisY
  }
}

export default class Rect {
  constructor (positionX = 0, positionY = 0, sizeX = 0, sizeY = 0) {
    this.position = new Vect(positionX, positionY)
    this.size = new Vect(sizeX, sizeY)
  }

  get width () { return this.size.x }
  get height () { return this.size.y }

  set positionX (value = 0) { this.position.x = value | 0 }
  set positionY (value = 0) { this.position.y = value | 0 }
  get positionX () { return this.position.x }
  get positionY () { return this.position.y }

  get top () { return this.position.y - (this.size.y / 2) }
  get left () { return this.position.x - (this.size.x / 2) }
  get right () { return this.position.x + (this.size.x / 2) }
  get bottom () { return this.position.y + (this.size.y / 2) }
}
