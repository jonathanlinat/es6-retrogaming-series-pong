import Sound from '../utils/sound'

export default class Collision {
  constructor () {
    this.sound = new Sound()
  }

  detect (collider = {}, collided = {}) {
    if (collider.name === 'player' && collided.name === 'canvas') {
      if (collider.top < 16) {
        collider.positionY = (collider.size.y / 2) + 16
      } else if (collider.bottom > collided.height - 16) {
        collider.positionY = collided.height - (collider.size.y / 2) - 16
      }
    } else if (collider.name === 'ball' && collided.name === 'canvas') {
      if (collider.left < 32 || collider.right > (collided.width - 32)) {
        this.sound.generate('square', 257, 490)
        collider.velocityX = -collider.velocityX
      } else if (collider.top < 0 || collider.bottom > collided.height) {
        this.sound.generate('square', 16, 226)
        collider.velocityY = -collider.velocityY
      }
    } else if (collider.name === 'ball' && collided.name === 'player') {
      if (collider.right > collided.left && collider.left < collided.right && collider.bottom > collided.top && collider.top < collided.bottom) {
        if (collider.right > collided.left && collider.left < collided.right) {
          collider.velocityX = -collider.velocityX
          const compoundedVelocity = (collider.positionY - collided.positionY) * (collided.positionY - collider.positionY) * 1.5
          if (collider.positionY < collided.positionY) {
            this.sound.generate('square', 96, 459)
            collider.velocityY = compoundedVelocity
          } else if (collider.positionY > collided.positionY) {
            this.sound.generate('square', 96, 459)
            collider.velocityY = -compoundedVelocity
          }
        } else if (collider.bottom > collided.top && collider.top < collided.bottom) {
          collider.velocityY = -collider.velocityY
        }
      }
    }
  }
}