/*
 * MIT License
 *
 * Copyright (c) 2018-2023 Jonathan Linat <https://www.github.com/jonathanlinat>
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

import Drawing from 'Modules/engine/drawing';

export default class Scoreboard {
  constructor(pixelSize = 0, pixelsByRow = 0, color = '') {
    this.pixelSize = pixelSize;
    this.halfPixelSize = this.pixelSize / 2;
    this.pixelsByRow = pixelsByRow;
    this.color = color;

    this.numbersList = [
      '11111001100110011001100110011111',
      '00010001000100010001000100010001',
      '11110001000111111000100010001111',
      '11110001000111110001000100011111',
      '10011001100111110001000100010001',
      '11111000100011110001000100011111',
      '10001000100011111001100110011111',
      '11110001000100010001000100010001',
      '11111001100111111001100110011111',
      '11111001100111110001000100010001',
    ];

    this.drawing = new Drawing();
  }

  render(canvas = {}, paddle = [], paddleId = 0) {
    this.paddleScore = paddle[paddleId].score.toString().split('');

    this.paddleScore.forEach((k = {}, l = 0) => {
      this.numbersList[k].split('').forEach((m = '', n = 0) => {
        if (m === '1') {
          this.positionX = {
            drawEachPixelByRow: (n % this.pixelsByRow) * this.pixelSize,
            setSpaceBetweenEachNumber: l * this.pixelsByRow * (this.pixelSize + this.halfPixelSize),
            positionEachScoreOnCanvas: (canvas.width / 4 + (paddleId === 1 ? 0 : 32)) * (paddleId === 1 ? 3 : 1),
            setOffsetFromLeftOfCanvas:
              this.pixelSize * 2 * this.paddleScore.length +
              (this.pixelSize * this.paddleScore.length - this.pixelSize),
          };

          this.positionY = {
            drawEachPixelByColumn: ((n / this.pixelsByRow) | 0) * this.pixelSize,
            setOffsetFromTopOfCanvas: 32,
          };

          this.drawing.drawRect(
            canvas,
            this.positionX.drawEachPixelByRow +
              this.positionX.setSpaceBetweenEachNumber +
              this.positionX.positionEachScoreOnCanvas -
              this.positionX.setOffsetFromLeftOfCanvas,
            this.positionY.drawEachPixelByColumn + this.positionY.setOffsetFromTopOfCanvas,
            this.pixelSize,
            this.pixelSize,
            this.color
          );
        }
      });
    });
  }
}
