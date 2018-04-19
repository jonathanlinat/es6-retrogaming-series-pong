const canvas = document.getElementById("es6-retrogaming-series-pong")

class Vect {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }
}

class Rect {
  constructor(w, h) {
    this.pos = new Vect
    this.size = new Vect(w, h)
  }
}

class Ball extends Rect {
  constructor() {
    super(8, 8)
    this.vel = new Vect()
  }

  get top() { return this.pos.y - this.size.y / 2 }
  get right() { return this.pos.x + this.size.x / 2 }
  get bottom() { return this.pos.y + this.size.y / 2 }
  get left() { return this.pos.x - this.size.x / 2 }
}

class Pong {
  constructor(canvas) {
    this._canvas = canvas
    this._context = this._canvas.getContext("2d")

    this.ball = new Ball
    this.ball.pos.x = (this._canvas.width / 2) + this.ball.left
    this.ball.pos.y = (this._canvas.height / 2) + this.ball.top
    this.ball.vel.x = 100
    this.ball.vel.y = 100

    let lastTime
    const callback = (millis) => {
      if (lastTime) this.update((millis - lastTime) / 1000)
      lastTime = millis
      requestAnimationFrame(callback)
    }

    callback()
  }

  drawRect(rect) {
    this._context.fillStyle = "white"
    this._context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y)
  }

  clearRect(rect) {
    this._context.save()
    this._context.clearRect(rect.pos.x - 1, rect.pos.y - 1, rect.size.x + 2, rect.size.y + 2)
    this._context.restore()
  }

  collide(rect, obj) {
    if (rect.left < 0 || rect.right > obj.width) rect.vel.x = -rect.vel.x
    if (rect.top < 0 || rect.bottom > obj.height) rect.vel.y = -rect.vel.y
  }

  update(time) {
    this.clearRect(this.ball)
    
    this.ball.pos.x += this.ball.vel.x * time
    this.ball.pos.y += this.ball.vel.y * time

    this.collide(this.ball, this._canvas)
  
    this.drawRect(this.ball, this._canvas)
  }
}

const pong = new Pong(canvas)
