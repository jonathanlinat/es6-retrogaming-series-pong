import Canvas from './classes/utils/canvas'
import Ball from './classes/ball'
import Divider from './classes/divider'
import Paddle from './classes/paddle'
import Score from './classes/score'

class Game {
  constructor () {
    const canvas = new Canvas('2d', 640, 480, 'black')
    canvas.create()

    const ball = new Ball((canvas.width / 2), (canvas.height / 2), 6, 6)
    ball.render(canvas)

    const paddles = [
      new Paddle(96, (canvas.height / 2), 6, 24),
      new Paddle((canvas.width - 96), (canvas.height / 2), 6, 24)
    ]
    paddles.forEach((paddle, index) => paddle.render(canvas, index))

    const divider = new Divider((canvas.width / 2), (canvas.height / 2), 2, 8)
    divider.render(canvas)

    const score = new Score(8, 4)
    paddles.forEach((paddle, index, _paddle) => score.render(canvas, _paddle, index))
  }
}

(function () {
  return new Game()
})()
