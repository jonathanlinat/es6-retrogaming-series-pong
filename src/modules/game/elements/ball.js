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

import Rect from 'Modules/engine/geometry';
import Drawing from 'Modules/engine/drawing';

export default class Ball extends Rect {
  constructor(
    directionX = 0,
    directionY = 0,
    positionX = 0,
    positionY = 0,
    sizeX = 0,
    sizeY = 0,
    velocityX = 0,
    velocityY = 0,
    relativeMaximumVelocity = 0,
    velocityMultiplier = 0,
    color = ''
  ) {
    super(directionX, directionY, positionX, positionY, sizeX, sizeY, velocityX, velocityY);

    this.defaultVelocityX = velocityX;
    this.defaultVelocityY = velocityY;
    this.relativeMaximumVelocity = relativeMaximumVelocity;
    this.velocityMultiplier = velocityMultiplier;
    this.color = color;

    this.nextPositionX = 0;
    this.nextPositionY = 0;

    this.drawing = new Drawing();
  }

  increaseVelocity() {
    if (
      Math.abs(this.velocityX) <= this.relativeMaximumVelocity ||
      Math.abs(this.velocityY) <= this.relativeMaximumVelocity
    ) {
      this.velocityX = this.velocityX * this.velocityMultiplier;
      this.velocityY = this.velocityY * this.velocityMultiplier;
    }
  }

  setRandomVelocity() {
    this.velocityX = this.defaultVelocityX * (Math.random() > 0.5 ? 1 : -1);
    this.velocityY = this.defaultVelocityY * (Math.random() > 0.5 ? 1 : -1);
  }

  setPositionOverTime(time = 0) {
    this.directionX = this.velocityX;
    this.directionY = this.velocityY;

    this.positionX += this.velocityX * time;
    this.positionY += this.velocityY * time;

    this.nextPositionX = (this.positionX + this.velocityX * time) | 0;
    this.nextPositionY = (this.positionY + this.velocityY * time) | 0;
  }

  setCenteredPosition(canvas = {}) {
    this.positionX = canvas.centerX;
    this.positionY = canvas.height * (Math.random() * (0.9 - 0.1 + 0.1));
  }

  render(canvas = {}) {
    this.drawing.drawRect(canvas, this.left, this.top, this.width, this.height, this.color);
  }
}
