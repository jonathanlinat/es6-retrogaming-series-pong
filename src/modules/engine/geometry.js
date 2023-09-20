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

export class Vect {
  constructor(axisX = 0, axisY = 0) {
    this.x = axisX;
    this.y = axisY;
  }
}

export default class Rect {
  constructor(
    directionX = 0,
    directionY = 0,
    positionX = 0,
    positionY = 0,
    sizeX = 0,
    sizeY = 0,
    velocityX = 0,
    velocityY = 0
  ) {
    this.direction = new Vect(directionX, directionY);
    this.position = new Vect(positionX, positionY);
    this.size = new Vect(sizeX, sizeY);
    this.velocity = new Vect(velocityX, velocityY);
  }

  set directionX(value = 0) {
    this.direction.x = Math.sign(value | 0);
  }

  set directionY(value = 0) {
    this.direction.y = Math.sign(value | 0);
  }

  get directionX() {
    return this.direction.x;
  }

  get directionY() {
    return this.direction.y;
  }

  set positionX(value = 0) {
    this.position.x = value | 0;
  }

  set positionY(value = 0) {
    this.position.y = value | 0;
  }

  get positionX() {
    return this.position.x;
  }

  get positionY() {
    return this.position.y;
  }

  get top() {
    return this.position.y - this.size.y / 2;
  }

  get left() {
    return this.position.x - this.size.x / 2;
  }

  get right() {
    return this.position.x + this.size.x / 2;
  }

  get bottom() {
    return this.position.y + this.size.y / 2;
  }

  get width() {
    return this.size.x;
  }

  get halfWidth() {
    return this.size.x / 2;
  }

  get height() {
    return this.size.y;
  }

  get halfHeight() {
    return this.size.y / 2;
  }

  set velocityX(value = 0) {
    this.velocity.x = value | 0;
  }

  set velocityY(value = 0) {
    this.velocity.y = value | 0;
  }

  get velocityX() {
    return this.velocity.x;
  }

  get velocityY() {
    return this.velocity.y;
  }
}
