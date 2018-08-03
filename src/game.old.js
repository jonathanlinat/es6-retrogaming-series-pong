/*
 * MIT License
 *
 * Copyright (c) 2018 Jonathan Linat
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

const canvas = document.createElement('canvas')
canvas.id = 'es6-retrogaming-series-pong'
canvas.width = 640
canvas.height = 480
document.body.appendChild(canvas)

class Vect {
  constructor (axisX, axisY) {
    this.x = axisX || 0
    this.y = axisY || 0
  }
}

class Rect {
  constructor (sizeW, sizeH) {
    this.position = new Vect()

    this.size = new Vect(sizeW, sizeH)
  }

  get top () { return this.position.y - (this.size.y / 2) }
  get right () { return this.position.x + (this.size.x / 2) }
  get bottom () { return this.position.y + (this.size.y / 2) }
  get left () { return this.position.x - (this.size.x / 2) }
}

class Ball extends Rect {
  constructor (positionX, positionY) {
    super(6, 6)

    this.position.x = positionX || 0
    this.position.y = positionY || 0

    this.velocity = new Vect()
    this.velocity.x = this.velocity.y = 0
  }
}

class Player extends Rect {
  constructor (positionX, positionY) {
    super(6, 24)

    this.position.x = positionX || 0
    this.position.y = positionY || 0

    this.score = 0
  }
}

class Divider extends Rect {
  constructor (positionX, positionY) {
    super(2, 8)

    this.position.x = positionX || 0
    this.position.y = positionY || 0
  }
}

class Pong {
  constructor (canvas) {
    this.canvas = canvas
    this.canvasContext = this.canvas.getContext('2d')
    this.canvasContext.fillStyle = 'white'
    this.audioContext = new AudioContext()
    this.oscillator = null
    this.gainNode = null

    this.globalVelocity = 200
    this.finalScoreToReach = 11

    this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2)

    this.players = [
      new Player(96, this.canvas.height / 2),
      new Player((this.canvas.width - 96), this.canvas.height / 2)
    ]

    this.divider = new Divider()
    this.dividers = []
    for (let i = 0; i < (this.canvas.height / this.divider.size.y); i++) {
      this.dividers.push(
        new Divider(296, (i * this.divider.size.y) * (this.divider.size.y / (this.divider.size.y / 2)))
      )
    }

    let lastTime
    const loopCallback = (millis) => {
      if (lastTime) {
        this.loopUpdater((millis - lastTime) / 1000)
      }
      lastTime = millis
      requestAnimationFrame(loopCallback)
    }
    loopCallback()

    this.standByScreen()
  }

  setRandomVelocityToBall () {
    this.ball.velocity.x = this.globalVelocity * (Math.random() > 0.5 ? 1 : -1)
    this.ball.velocity.y = this.globalVelocity * (Math.random() > 0.5 ? 1 : -1)
  }

  resetBallPositionAndVelocity () {
    this.ball.position.x = this.canvas.width / 2
    this.ball.position.y = Math.random() * this.canvas.height

    this.ball.velocity.x = this.ball.velocity.y = 0
  }

  resetPlayersScore () {
    this.players.forEach((player, index, _player) => { _player[index].score = 0 })
  }

  increasePlayerScore (playerId) {
    this.generateSound(257, 490)
    this.players[playerId].score++
  }

  standByScreen () {
    this.isStandByScreen = true

    this.playerControl()
    this.resetBallPositionAndVelocity()
    this.setRandomVelocityToBall()
  }

  startNewRound (playerId) {
    if (playerId !== undefined) {
      this.increasePlayerScore(playerId)
    }

    if (this.players[0].score === this.finalScoreToReach || this.players[1].score === this.finalScoreToReach) {
      this.standByScreen()
    } else {
      this.resetBallPositionAndVelocity()
      this.setRandomVelocityToBall()
    }
  }

  playerControl (event) {
    this.canvas.addEventListener('click', event => {
      if ((this.ball.velocity.x === 0 || this.ball.velocity.y === 0) || this.isStandByScreen) {
        this.isStandByScreen = false

        this.resetPlayersScore()
        this.startNewRound()
      }
    })

    this.canvas.addEventListener('mousemove', event => {
      this.players.forEach(player => { player.position.y = event.offsetY })
    })
  }

  clearCanvas () {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawRect (obj) {
    if (obj === this.ball && obj.velocity.x === 0 && obj.velocity.y === 0) {
      this.clearCanvas()
    } else {
      this.canvasContext.fillRect(obj.left, obj.top, obj.size.x, obj.size.y)
    }
  }

  drawScore (playerId) {
    const pixelSize = 8
    const pixelsByRow = 4
    const numbersList = [
      '11111001100110011001100110011111',
      '00010001000100010001000100010001',
      '11110001000111111000100010001111',
      '11110001000111110001000100011111',
      '10011001100111110001000100010001',
      '11111000100011110001000100011111',
      '10001000100011111001100110011111',
      '11110001000100010001000100010001',
      '11111001100111111001100110011111',
      '11111001100111110001000100010001'
    ]

    const playerScore = this.players[playerId].score.toString().split('')
    playerScore.forEach((playerScore, pos) => {
      numbersList[playerScore].split('').forEach((pixel, index) => {
        if (pixel === '1') {
          this.canvasContext.fillRect(
            ((index % pixelsByRow) * pixelSize) + (pos * pixelsByRow * 10) + (this.canvas.width / 4) * (playerId === 0 ? 3 : 1) - (playerScore.length === 1 ? (pixelSize * 2) : (pixelSize - (pixelsByRow * (-pixelSize)))),
            ((index / pixelsByRow | 0) * pixelSize) + 32,
            pixelSize,
            pixelSize
          )
        }
      })
    })
  }

  positionBallOverTime (time) {
    this.ball.position.x += this.ball.velocity.x * time
    this.ball.position.y += this.ball.velocity.y * time
  }

  generateSound (duration, frequency) {
    this.oscillator = this.audioContext.createOscillator()
    this.gainNode = this.audioContext.createGain()
    this.oscillator.connect(this.gainNode)
    this.oscillator.type = 'square'
    this.oscillator.frequency.value = frequency
    this.gainNode.connect(this.audioContext.destination)
    this.oscillator.start(0)

    this.gainNode.gain.exponentialRampToValueAtTime(
      0.00001, this.audioContext.currentTime + (duration / 1000)
    )
  }

  onCollide (colliderObj, collidedObj) {
    if (colliderObj === this.ball && collidedObj === this.canvas) {
      if (colliderObj.left < 32 || colliderObj.right > (collidedObj.width - 32)) {
        if (this.isStandByScreen) {
          this.generateSound(16, 226)
          colliderObj.velocity.x = -colliderObj.velocity.x
        } else {
          this.startNewRound(colliderObj.left < 32 ? 0 : 1)
        }
      } else if (colliderObj.top < 0 || colliderObj.bottom > collidedObj.height) {
        this.generateSound(16, 226)
        colliderObj.velocity.y = -colliderObj.velocity.y
      }
    } else if (colliderObj === this.ball && (collidedObj === this.players[0] || this.players[1])) {
      if (colliderObj.right > collidedObj.left && colliderObj.left < collidedObj.right && colliderObj.bottom > collidedObj.top && colliderObj.top < collidedObj.bottom) {
        colliderObj.velocity.x = -colliderObj.velocity.x
        if (colliderObj.position.y < collidedObj.position.y) {
          this.generateSound(96, 459)
          colliderObj.velocity.y = ((colliderObj.position.y - collidedObj.position.y) * ((collidedObj.position.y - colliderObj.position.y) * 1.5))
        } else if (colliderObj.position.y > collidedObj.position.y) {
          this.generateSound(96, 459)
          colliderObj.velocity.y = -((colliderObj.position.y - collidedObj.position.y) * ((collidedObj.position.y - colliderObj.position.y) * 1.5))
        }
      }
    } else if ((colliderObj === this.players[0] || this.players[1]) && collidedObj === this.canvas) {
      if (colliderObj.top < 16) {
        colliderObj.position.y = (colliderObj.size.y / 2) + 16
      } else if (colliderObj.bottom > collidedObj.height - 16) {
        colliderObj.position.y = collidedObj.height - (colliderObj.size.y / 2) - 16
      }
    }
  }

  loopUpdater (time) {
    this.clearCanvas()

    this.drawRect(this.ball)
    this.positionBallOverTime(time)
    this.onCollide(this.ball, this.canvas)
    this.players.forEach((player, index) => this.drawScore(index))
    this.dividers.forEach(divider => this.drawRect(divider))

    if (!this.isStandByScreen) {
      this.players.forEach(player => this.onCollide(player, this.canvas))
      this.players.forEach(player => this.onCollide(this.ball, player))
      this.players.forEach(player => this.drawRect(player))
    }
  }
}

document.addEventListener('load', new Pong(canvas))
