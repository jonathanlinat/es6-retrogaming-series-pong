export default class Gamelogic {
  constructor (canvas = {}, ball = {}, player = []) {
    this.canvas = canvas
    this.ball = ball
    this.players = player
  }

  checkReachedMaxHiScore () {}

  startNewRound (playerId = 0) {
    this.players[playerId].increaseScore()
    this.ball.resetPositionAndVelocity(this.canvas)
    this.ball.setRandomVelocity()
  }
}
