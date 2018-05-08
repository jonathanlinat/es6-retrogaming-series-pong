const canvas = document.getElementById("es6-retrogaming-series-pong")
canvas.width = 640
canvas.height = 480

class Vect {
  constructor(axisX, axisY) {
    this.x = axisX || 0
    this.y = axisY || 0
  }
}

class Rect {
  constructor(sizeW, sizeH) {
    this.pos = new Vect

    this.size = new Vect(sizeW, sizeH)
  }

  get top() {
    return this.pos.y - (this.size.y / 2)
  }
  get right() {
    return this.pos.x + (this.size.x / 2)
  }
  get bottom() {
    return this.pos.y + (this.size.y / 2)
  }
  get left() {
    return this.pos.x - (this.size.x / 2)
  }
}

class Ball extends Rect {
  constructor(posX, posY) {
    super(6, 6)

    this.pos.x = posX || 0
    this.pos.y = posY || 0

    this.vel = new Vect
    this.vel.x = this.vel.y = 0
  }
}

class Player extends Rect {
  constructor(posX, posY) {
    super(6, 24)

    this.pos.x = posX || 0
    this.pos.y = posY || 0

    this.score = 0
  }
}

class Divider extends Rect {
  constructor(posX, posY) {
    super(2, 8)

    this.pos.x = posX || 0
    this.pos.y = posY || 0
  }
}

class Pong {
  constructor(canvas) {
    this._canvas = canvas
    this._context = this._canvas.getContext("2d")
    this._context.fillStyle = "white"

    this.globalVel = 300

    this.ball = new Ball(this._canvas.width / 2, this._canvas.height / 2)

    this.players = [
      new Player(96, this._canvas.height / 2),
      new Player((this._canvas.width - 96), this._canvas.height / 2)
    ]

    this.divider = new Divider()
    this.dividers = []
    for (let i = 0; i < (this._canvas.height / this.divider.size.y); i++) {
      this.dividers.push(
        new Divider(this._canvas.width / 2, (i * this.divider.size.y) * (this.divider.size.y / (this.divider.size.y / 2)))
      )
    }

    let lastTime
    const callback = (millis) => {
      if (lastTime) {
        this.gameLoop((millis - lastTime) / 1000)
      }
      lastTime = millis
      requestAnimationFrame(callback)
    }
    callback()

    this.playerControl()
  }

  drawRect(obj) {
    if (obj === this.ball && obj.vel.x === 0 && obj.vel.y == 0) {
      this.clearRect(obj)
    } else {
      this._context.fillRect(obj.left, obj.top, obj.size.x, obj.size.y)
    }
  }

  clearRect(obj) {
    this._context.clearRect(obj.left - 1, obj.top - 1, obj.size.x + 2, obj.size.y + 2)
  }

  drawScore(playerId) {
    const pixelSize = 8
    const pixelsByRow = 4
    const numbersList = [
      "11111001100110011001100110011111",
      "00010001000100010001000100010001",
      "11110001000111111000100010001111",
      "11110001000111110001000100011111",
      "10011001100111110001000100010001",
      "11111000100011110001000100011111",
      "10001000100011111001100110011111",
      "11110001000100010001000100010001",
      "11111001100111111001100110011111",
      "11111001100111110001000100010001"
    ]
    this.players[playerId].score.toString().split("").map((value) => {
      numbersList[value].split("").forEach((value, index) => {
        if (value === "1") {
          this._context.fillRect(
            playerId === 0 ? (
              (index % pixelsByRow) * pixelSize) + ((this._canvas.width / 4) - (pixelSize * 2)
            ) : (
              (index % pixelsByRow) * pixelSize) + ((this._canvas.width / 4) * 3 - (pixelSize * 2)
            ),
            ((index / pixelsByRow | 0) * pixelSize) + 32,
            pixelSize,
            pixelSize
          )
        }
      })
    })
  }

  clearScore(scoreId) {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

  startGame() {
    if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
      this.ball.vel.x = this.globalVel * (Math.random() > 0.5 ? 1 : -1)
      this.ball.vel.y = this.globalVel * (Math.random() * 2 - 1)
    }
  }

  resetGame() {
    this.ball.pos.x = this._canvas.width / 2
    this.ball.pos.y = Math.random() * this._canvas.height

    this.ball.vel.x = this.ball.vel.y = 0
  }

  positionBallOverTime(time) {
    this.ball.pos.x += this.ball.vel.x * time
    this.ball.pos.y += this.ball.vel.y * time
  }

  playerControl(event) {
    this._canvas.addEventListener("click", event => {
      if (this.ball.vel.x === 0 || this.ball.vel.y === 0) {
        this.startGame()
      }
    })

    this._canvas.addEventListener("mousemove", event => {
      this.players.forEach((value, index, array) => array[index].pos.y = event.offsetY)
    })
  }

  onCollide(colliderObj, collidedObj) {
    if (colliderObj === this.ball && collidedObj === this._canvas) {
      if (colliderObj.left < 32 || colliderObj.right > (collidedObj.width - 32)) {
        const playerId = colliderObj.left < 32 ? 1 : 0
        this.players[playerId].score++
        this.resetGame()
      } else if (colliderObj.top < 0 || colliderObj.bottom > collidedObj.height) {
        colliderObj.vel.y = -colliderObj.vel.y
      }
    } else if (colliderObj === this.ball && (collidedObj === this.players[0] || this.players[1])) {
      if (colliderObj.right > collidedObj.left && colliderObj.left < collidedObj.right &&
          colliderObj.bottom > collidedObj.top && colliderObj.top < collidedObj.bottom) {
        colliderObj.vel.x = -colliderObj.vel.x
        if (colliderObj.pos.y < collidedObj.pos.y) {
          colliderObj.vel.y = ((colliderObj.pos.y - collidedObj.pos.y) * ((collidedObj.pos.y - colliderObj.pos.y) * 1.5))
        } else if (colliderObj.pos.y > collidedObj.pos.y) {
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

  gameLoop(time) {
    this.clearRect(this.ball)
    this.players.forEach(value => this.clearRect(value))
    this.players.forEach((value, index) => this.clearScore(index))
    this.dividers.forEach(value => this.clearRect(value))

    this.positionBallOverTime(time)

    this.onCollide(this.ball, this._canvas)
    this.players.forEach(value => this.onCollide(this.ball, value))
    this.players.forEach(value => this.onCollide(value, this._canvas))

    this.drawRect(this.ball)
    this.players.forEach(value => this.drawRect(value))
    this.players.forEach((value, index) => this.drawScore(index))
    this.dividers.forEach(value => this.drawRect(value))
  }
}

const pong = new Pong(canvas)
