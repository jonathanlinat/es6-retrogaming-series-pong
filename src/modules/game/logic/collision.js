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
 * furnished to do so, subject to the following isColliderNextPositionXOverCollidedPositions:
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
  constructor(canvas = {}, ball = {}, paddles = [], sound = {}, gamelogic = {}) {
    this.canvas = canvas;
    this.ball = ball;
    this.paddles = paddles;
    this.sound = sound;
    this.gamelogic = gamelogic;
  }

  detect(collider = {}, collided = {}) {
    if (this.paddles.includes(collider) && collided === this.canvas) {
      if (collider.top <= collided.top + 4) {
        collider.positionY = collider.height;
      }

      if (collider.bottom >= collided.bottom - 4) {
        collider.positionY = collided.bottom - collider.height;
      }
    }

    if (collider === this.ball && collided === this.canvas) {
      if (
        (collider.directionX === -1 && collider.nextPositionX - collider.halfWidth <= collided.left + 32) ||
        (collider.directionX === 1 && collider.nextPositionX + collider.halfWidth >= collided.right - 32)
      ) {
        this.sound.generate('square', 257, 490, 0.25);

        this.gamelogic.startNewRound(collider.nextPositionX - collider.halfWidth <= 32 ? 1 : 0);
      }

      if (collider.directionY === -1 && collider.nextPositionY - collider.halfWidth <= collided.top) {
        this.sound.generate('square', 16, 226, 0);

        collider.positionY = collided.top + collider.halfWidth;
        collider.velocityY = -collider.velocityY;
      }

      if (collider.directionY === 1 && collider.nextPositionY + collider.halfWidth >= collided.bottom) {
        this.sound.generate('square', 16, 226, 0);

        collider.positionY = collided.bottom - collider.halfWidth;
        collider.velocityY = -collider.velocityY;
      }
    }

    if (collider === this.ball && this.paddles.includes(collided)) {
      if (
        collider.nextPositionX - collider.halfWidth <= collided.right &&
        collider.nextPositionX + collider.halfWidth >= collided.left &&
        collider.top <= collided.bottom &&
        collider.bottom >= collided.top
      ) {
        this.sound.generate('square', 96, 459, 0);

        let positionAtCollisionX = 0;

        if (collider.directionX === -1 && collided === this.paddles[0]) {
          const timeBeforeCollisionX = (collided.right + collider.left) / collider.velocityX;

          positionAtCollisionX = Math.abs(collider.left - collider.velocityX * timeBeforeCollisionX);

          if (positionAtCollisionX === collided.right)
            console.log(collider.positionY, collided.positionY, collider.positionY - collided.positionY);
        }

        if (collider.directionX === 1 && collided === this.paddles[1]) {
          const timeBeforeCollisionX = (collided.left - collider.right) / collider.velocityX;

          positionAtCollisionX = Math.abs(collider.right + collider.velocityX * timeBeforeCollisionX);

          if (positionAtCollisionX === collided.left)
            console.log(collider.positionY, collided.positionY, collider.positionY - collided.positionY);
        }

        collider.positionX = positionAtCollisionX;
        collider.velocityX = -collider.velocityX;
        collider.increaseVelocity();
      }
    }
  }
}
