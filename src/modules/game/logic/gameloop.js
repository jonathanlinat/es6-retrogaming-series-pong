/*
 * MIT License
 *
 * Copyright (c) 2018-2023 Jonathan Linat <https://www.github.com/jonathanlinat>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
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

import Updater from 'Modules/engine/updater';

export default class Loop {
  constructor(
    canvas = {},
    ball = {},
    paddles = [],
    scoreboard = {},
    divider = {},
    input = {},
    unscrambler = {},
    sound = {},
    gamelogic = {},
    collision = {},
    mappedKeys = []
  ) {
    this.canvas = canvas;
    this.ball = ball;
    this.paddles = paddles;
    this.scoreboard = scoreboard;
    this.divider = divider;
    this.input = input;
    this.unscrambler = unscrambler;
    this.sound = sound;
    this.gamelogic = gamelogic;
    this.collision = collision;
    this.mappedKeys = mappedKeys;

    this.updater = new Updater(this.loop.bind(this), this.mappedKeys);
  }

  initialize() {
    this.updater.performAnimation(0);
  }

  loop(delta = 0) {
    this.canvas.clear();

    this.divider.render(this.canvas);

    this.ball.setPositionOverTime(delta);
    this.ball.render(this.canvas);

    this.paddles.forEach((paddle = {}, index = 0, _paddle = []) => {
      this.collision.detect(this.ball, paddle);
      this.collision.detect(paddle, this.canvas);

      this.gamelogic.checkReachedMaxHiScore(index);

      paddle.setAutonomousReference(this.ball);
      paddle.move(this.input.handledKeys);
      paddle.render(this.canvas, index);

      this.scoreboard.render(this.canvas, _paddle, index);
    });

    this.collision.detect(this.ball, this.canvas);

    this.updater.toggle(this.input.handledKeys);

    this.unscrambler.toggle(this.input.handledKeys);
    this.unscrambler.render(this.canvas, [
      `Rendering performance: ${this.updater.calculateFramesPerSecond(
        delta
      )} fps, ${this.updater.calculateMillisecondsPerFrame(delta)} mspf`,
      `Canvas Size: ${this.canvas.width}, ${this.canvas.height}`,
      `Gameloop Status: ${this.updater.paused ? 'Paused' : 'Active'}`,
      `Sound: ${this.sound.isDisabled() ? 'Off' : 'On'}`,
      `Ball Position: ${this.ball.positionX}, ${this.ball.positionY}`,
      `Ball Next Position: ${this.ball.nextPositionX}, ${this.ball.nextPositionY}`,
      `Ball Direction: ${this.ball.directionX}, ${this.ball.directionY}`,
      `Ball Velocity: ${this.ball.velocityX}, ${this.ball.velocityY}`,
      `Ball Velocity Multiplier: ${this.ball.velocityMultiplier}`,
      `Paddle 1 Score: ${this.paddles[0].score}`,
      `Paddle 1 Position: ${this.paddles[0].positionX}, ${this.paddles[0].positionY}`,
      `Paddle 2 Score: ${this.paddles[1].score}`,
      `Paddle 2 Position: ${this.paddles[1].positionX}, ${this.paddles[1].positionY}`,
    ]);
  }
}
