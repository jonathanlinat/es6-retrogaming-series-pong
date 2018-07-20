export default class Gamelogic {
  constructor (canvas = {}, ball = {}, score = {}) {
    this.canvas = canvas
    this.ball = ball
    this.score = score
  }

  startNewRound (player = {}) {
    this.score.increase(player)
    this.ball.resetPositionAndVelocity(this.canvas)
    this.ball.setRandomVelocity()
  }
}
