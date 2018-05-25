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
    this.pos = new Vect()

    this.size = new Vect(sizeW, sizeH)
  }

  get top () { return this.pos.y - (this.size.y / 2) }
  get right () { return this.pos.x + (this.size.x / 2) }
  get bottom () { return this.pos.y + (this.size.y / 2) }
  get left () { return this.pos.x - (this.size.x / 2) }
}

class Ball extends Rect {
  constructor (posX, posY) {
    super(6, 6)

    this.pos.x = posX || 0
    this.pos.y = posY || 0

    this.vel = new Vect()
    this.vel.x = this.vel.y = 0
  }
}

class Player extends Rect {
  constructor (posX, posY) {
    super(6, 24)

    this.pos.x = posX || 0
    this.pos.y = posY || 0

    this.score = 0
  }
}

class Divider extends Rect {
  constructor (posX, posY) {
    super(2, 8)

    this.pos.x = posX || 0
    this.pos.y = posY || 0
  }
}

class Pong {
  constructor (canvas) {
    this._canvas = canvas
    this._canvasContext = this._canvas.getContext('2d')
    this._canvasContext.fillStyle = 'white'
    this._audioContext = new AudioContext()
    this.o = null
    this.g = null

    this.globalVel = 200
    this.finalScoreToReach = 11

    this.ball = new Ball(this._canvas.width / 2, this._canvas.height / 2)

    this.players = [
      new Player(96, this._canvas.height / 2),
      new Player((this._canvas.width - 96), this._canvas.height / 2)
    ]

    this.divider = new Divider()
    this.dividers = []
    for (let i = 0; i < (this._canvas.height / this.divider.size.y); i++) {
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
    this.ball.vel.x = this.globalVel * (Math.random() > 0.5 ? 1 : -1)
    this.ball.vel.y = this.globalVel * (Math.random() > 0.5 ? 1 : -1)
  }

  resetBallPositionAndVelocity () {
    this.ball.pos.x = this._canvas.width / 2
    this.ball.pos.y = Math.random() * this._canvas.height

    this.ball.vel.x = this.ball.vel.y = 0
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
    this._canvas.addEventListener('click', event => {
      if ((this.ball.vel.x === 0 || this.ball.vel.y === 0) || this.isStandByScreen) {
        this.isStandByScreen = false

        this.resetPlayersScore()
        this.startNewRound()
      }
    })

    this._canvas.addEventListener('mousemove', event => {
      this.players.forEach(player => { player.pos.y = event.offsetY })
    })
  }

  clearCanvas () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

  drawRect (obj) {
    if (obj === this.ball && obj.vel.x === 0 && obj.vel.y === 0) {
      this.clearCanvas()
    } else {
      this._canvasContext.fillRect(obj.left, obj.top, obj.size.x, obj.size.y)
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
          this._canvasContext.fillRect(
            ((index % pixelsByRow) * pixelSize) + (pos * pixelsByRow * 10) + (this._canvas.width / 4) * (playerId === 0 ? 3 : 1) - (playerScore.length === 1 ? (pixelSize * 2) : (pixelSize - (pixelsByRow * (-pixelSize)))),
            ((index / pixelsByRow | 0) * pixelSize) + 32,
            pixelSize,
            pixelSize
          )
        }
      })
    })
  }

  positionBallOverTime (time) {
    this.ball.pos.x += this.ball.vel.x * time
    this.ball.pos.y += this.ball.vel.y * time
  }

  generateSound (duration, frequency) {
    this.o = this._audioContext.createOscillator()
    this.g = this._audioContext.createGain()
    this.o.connect(this.g)
    this.o.type = 'square'
    this.o.frequency.value = frequency
    this.g.connect(this._audioContext.destination)
    this.o.start(0)

    this.g.gain.exponentialRampToValueAtTime(
      0.00001, this._audioContext.currentTime + (duration / 1000)
    )
  }

  onCollide (colliderObj, collidedObj) {
    if (colliderObj === this.ball && collidedObj === this._canvas) {
      if (colliderObj.left < 32 || colliderObj.right > (collidedObj.width - 32)) {
        if (this.isStandByScreen) {
          this.generateSound(16, 226)
          colliderObj.vel.x = -colliderObj.vel.x
        } else {
          this.startNewRound(colliderObj.left < 32 ? 0 : 1)
        }
      } else if (colliderObj.top < 0 || colliderObj.bottom > collidedObj.height) {
        this.generateSound(16, 226)
        colliderObj.vel.y = -colliderObj.vel.y
      }
    } else if (colliderObj === this.ball && (collidedObj === this.players[0] || this.players[1])) {
      if (colliderObj.right > collidedObj.left && colliderObj.left < collidedObj.right && colliderObj.bottom > collidedObj.top && colliderObj.top < collidedObj.bottom) {
        colliderObj.vel.x = -colliderObj.vel.x
        if (colliderObj.pos.y < collidedObj.pos.y) {
          this.generateSound(96, 459)
          colliderObj.vel.y = ((colliderObj.pos.y - collidedObj.pos.y) * ((collidedObj.pos.y - colliderObj.pos.y) * 1.5))
        } else if (colliderObj.pos.y > collidedObj.pos.y) {
          this.generateSound(96, 459)
          colliderObj.vel.y = -((colliderObj.pos.y - collidedObj.pos.y) * ((collidedObj.pos.y - colliderObj.pos.y) * 1.5))
        }
      }
    } else if ((colliderObj === this.players[0] || this.players[1]) && collidedObj === this._canvas) {
      if (colliderObj.top < 16) {
        colliderObj.pos.y = (colliderObj.size.y / 2) + 16
      } else if (colliderObj.bottom > collidedObj.height - 16) {
        colliderObj.pos.y = collidedObj.height - (colliderObj.size.y / 2) - 16
      }
    }
  }

  loopUpdater (time) {
    this.clearCanvas()

    this.drawRect(this.ball)
    this.positionBallOverTime(time)
    this.onCollide(this.ball, this._canvas)
    this.players.forEach((player, index) => this.drawScore(index))
    this.dividers.forEach(divider => this.drawRect(divider))

    if (!this.isStandByScreen) {
      this.players.forEach(player => this.onCollide(player, this._canvas))
      this.players.forEach(player => this.onCollide(this.ball, player))
      this.players.forEach(player => this.drawRect(player))
    }
  }
}

document.addEventListener('load', new Pong(canvas))
