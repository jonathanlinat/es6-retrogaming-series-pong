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

export default class Updater {
  constructor (callback = {}) {
    this.callback = callback
    this.previousDelta = 0
  }

  calculateFramesPerSecond (delta = 0, previousDelta = 0) {
    return Number(1 / (delta - previousDelta)).toFixed(2)
  }

  calculateMillisecondsPerFrame (delta = 0, previousDelta = 0) {
    return Number((delta - previousDelta) * 1000).toFixed(2)
  }

  performAnimation (delta = 0) {
    requestAnimationFrame(this.performAnimation.bind(this))

    if (this.previousDelta) this.callback((delta - this.previousDelta) / 1000)

    this.previousDelta = delta
  }
}
