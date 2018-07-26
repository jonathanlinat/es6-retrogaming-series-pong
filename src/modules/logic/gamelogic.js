export default class Gamelogic {
  constructor (canvas = {}, ball = {}, player = []) {
    this.canvas = canvas
    this.ball = ball
    this.players = player
  }

  startNewRound (playerId = 0) {
    this.players[playerId].increaseScore()
    this.ball.setCenteredPosition(this.canvas)
    this.ball.setRandomVelocity()
  }
}
