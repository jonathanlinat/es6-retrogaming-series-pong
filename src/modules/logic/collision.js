import Gamelogic from './gamelogic'
import Sound from '../utils/sound'

export default class Collision {
  constructor (canvas = {}, ball = {}, players = []) {
    this.canvas = canvas
    this.ball = ball
    this.players = players

    this.gamelogic = new Gamelogic(this.canvas, this.ball, this.players)
    this.sound = new Sound()

    this.sound.disable()
  }

  detect (collider = {}, collided = {}) {
    if (this.players.includes(collider) && collided === this.canvas) {
      if (collider.top < 16) {
        collider.positionY = (collider.size.y / 2) + 16
      } else if (collider.bottom > collided.height - 16) {
        collider.positionY = collided.height - (collider.size.y / 2) - 16
      }
    } else if (collider === this.ball && collided === this.canvas) {
      if (collider.left < 32 || collider.right > (collided.width - 32)) {
        this.sound.generate('square', 257, 490)
        if (collider.left < 32) {
          this.gamelogic.startNewRound(1)
        } else {
          this.gamelogic.startNewRound(0)
        }
      } else if (collider.top < 0 || collider.bottom > collided.height) {
        this.sound.generate('square', 16, 226)
        collider.velocityY = -collider.velocityY
      }
    } else if (collider === this.ball && this.players.includes(collided)) {
      if (collider.right > collided.left && collider.left < collided.right && collider.bottom > collided.top && collider.top < collided.bottom) {
        this.sound.generate('square', 96, 459)
        collider.increaseVelocity()
        if (collider.right > collided.left && collider.left < collided.right) {
          collider.velocityX = -collider.velocityX
        } else if (collider.top > collided.bottom && collider.bottom < collided.top) {
          collider.velocityY = -collider.velocityY
        }
      }
    }
  }
}
