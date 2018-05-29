import Canvas from './classes/utils/canvas'
import Drawing from './classes/utils/drawing'
import Ball from './classes/ball'
import Divider from './classes/divider'
import Paddle from './classes/paddle'

const canvas = new Canvas('2d', 640, 480, 'black')
canvas.render()

const drawing = new Drawing()

const ball = new Ball(canvas.getWidth() / 2, canvas.getHeight() / 2)
drawing.drawRect(canvas.getContext(), ball)

const players = [
  new Paddle(96, canvas.getHeight() / 2),
  new Paddle((canvas.getWidth() - 96), canvas.getHeight() / 2)
]
players.forEach(player => drawing.drawRect(canvas.getContext(), player))

const dividers = []
for (let i = 0; i < (canvas.getHeight() / new Divider().size.y); i++) {
  dividers.push(
    new Divider((canvas.getWidth() / 2), (i * new Divider().size.y) * (new Divider().size.y / (new Divider().size.y / 2)))
  )
}
dividers.forEach(divider => drawing.drawRect(canvas.getContext(), divider))
