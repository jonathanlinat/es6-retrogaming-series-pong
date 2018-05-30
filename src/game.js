import Canvas from './classes/utils/canvas'
import Ball from './classes/ball'
import Divider from './classes/divider'
import Paddle from './classes/paddle'

class Game {
  constructor () {
    const canvas = new Canvas('2d', 640, 480, 'black')
    canvas.create()

    const ball = new Ball(canvas.halfWidth, canvas.halfHeight, 6, 6)
    ball.render(canvas)

    const paddles = [
      new Paddle(96, canvas.halfHeight, 6, 24),
      new Paddle((canvas.width - 96), canvas.halfHeight, 6, 24)
    ]
    paddles.forEach(paddle => paddle.render(canvas))

    const divider = new Divider(canvas.halfWidth, canvas.halfHeight, 2, 8)
    divider.render(canvas)
  }
}

(function () {
  return new Game()
})()
