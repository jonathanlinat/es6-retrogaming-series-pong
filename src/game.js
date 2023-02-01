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

import Canvas from 'Modules/engine/canvas';
import Ball from 'Modules/game/elements/ball';
import Paddle from 'Modules/game/elements/paddle';
import Scoreboard from 'Modules/game/ui/scoreboard';
import Divider from 'Modules/game/ui/divider';
import Sound from 'Modules/engine/sound';
import Input from 'Modules/engine/input';
import Unscrambler from 'Modules/engine/unscrambler';
import Gamelogic from 'Modules/game/logic/gamelogic';
import Collision from 'Modules/game/logic/collision';
import Gameloop from 'Modules/game/logic/gameloop';

class Game {
  constructor() {
    this.canvas = new Canvas('2d', 640, 480);
    this.ball = new Ball(
      this.canvas.centerX,
      this.canvas.height * (Math.random() * (0.9 - 0.1 + 0.1)),
      6,
      6,
      '#e8e8e8',
      256,
      1.025
    );
    this.paddles = [
      new Paddle(96, this.canvas.centerY, 6, 24, '#e8e8e8', 11, 1, 8, ['w', 's']),
      new Paddle(this.canvas.width - 96, this.canvas.centerY, 6, 24, '#e8e8e8', 11, 1, 8, ['ArrowUp', 'ArrowDown']),
    ];
    this.scoreboard = new Scoreboard(6, 4, '#e8e8e8');
    this.divider = new Divider(this.canvas.centerX - 16, this.canvas.centerY, 2, 6, '#e8e8e8');
    this.sound = new Sound(25);
    this.input = new Input(document);
    this.unscrambler = new Unscrambler(['F12']);
    this.gamelogic = new Gamelogic(this.canvas, this.ball, this.paddles);
    this.collision = new Collision(this.canvas, this.ball, this.paddles, this.sound, this.gamelogic);
    this.gameloop = new Gameloop(
      this.canvas,
      this.ball,
      this.paddles,
      this.scoreboard,
      this.divider,
      this.input,
      this.unscrambler,
      this.gamelogic,
      this.collision
    );
  }

  initialize() {
    this.canvas.create();
    this.sound.disable();
    this.input.listenToEvents();
    this.gameloop.initialize();
  }
}

new Game().initialize();
