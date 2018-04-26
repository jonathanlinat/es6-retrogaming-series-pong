const canvas = document.getElementById("es6-retrogaming-series-pong")

class Vect {
  constructor(axisX, axisY) {
    this.x = axisX || 0;
    this.y = axisY || 0;
  }

  get len() { return Math.sqrt((this.x * this.x) + (this.y * this.y)); }
  set len(value) {
    const fact = value / this.len;
    this.x *= fact;
    this.y *= fact;
  }
}

class Rect {
  constructor(sizeW, sizeH) {
    this.pos = new Vect;
    this.size = new Vect(sizeW, sizeH);
  }

  get top() { return this.pos.y - (this.size.y / 2); }
  get right() { return this.pos.x + (this.size.x / 2); }
  get bottom() { return this.pos.y + (this.size.y / 2); }
  get left() { return this.pos.x - (this.size.x / 2); }
}

class Divider extends Rect {
  constructor(posX, posY) {
    super(2, 8);

    this.pos.x = posX || 0;
    this.pos.y = posY || 0;
  }
}

class Ball extends Rect {
  constructor(posX, posY) {
    super(8, 8);

    this.pos.x = posX || 0;
    this.pos.y = posY || 0;
    this.vel = new Vect;
    this.vel.x = this.vel.y = 0;
  }
}

class Player extends Rect {
  constructor(posX, posY) {
    super(8, 30);

    this.pos.x = posX || 0;
    this.pos.y = posY || 0;
    this.score = 0;
  }
}

class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");

    this.divider = new Divider();
    this.dividers = [];
    for (let i = 0; i < (this._canvas.height / this.divider.size.y); i++) {
      this.dividers.push(new Divider(this._canvas.width / 2, (i * this.divider.size.y) * (this.divider.size.y / (this.divider.size.y / 2))));
    }
    this.ball = new Ball(this._canvas.width / 2, this._canvas.height / 2);
    this.players = [
      new Player(this._canvas.width / 6, this._canvas.height / 2),
      new Player((this._canvas.width / 6) * 5, this._canvas.height / 2)
    ];

    let lastTime;
    const callback = (millis) => {
      if (lastTime) {
        this.loop((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();

    this.playerControl();
  }

  drawRect(obj) {
    this._context.fillStyle = "white";
    this._context.fillRect(obj.left, obj.top, obj.size.x, obj.size.y);
  }

  removeRect(obj) {
    this._context.clearRect(obj.left - 1, obj.top - 1, obj.size.x + 2, obj.size.y + 2);
  }

  startGame() {
    if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
      this.ball.vel.x = this.ball.vel.y = 300 * (Math.random() > 0.5 ? 1 : -1);
      this.ball.vel.len = 200;
    }
  }

  resetGame() {
    this.ball.pos.x = this._canvas.width / 2;
    this.ball.pos.y = this._canvas.height / 2;
    this.ball.vel.x = this.ball.vel.y = 0;
  }

  playerControl(event) {
    this._canvas.addEventListener("click", event => {
      this.startGame();
    });

    this._canvas.addEventListener("mousemove", event => {
      this.removeRect(this.players[0]);
      this.players[0].pos.y = event.offsetY;
    });
  }

  collide(colliderObj, collidedObj) {
    if (collidedObj === this._canvas) {
      if (colliderObj.left < 0 || colliderObj.right > collidedObj.width) {
        this.resetGame();
      }
      if (colliderObj.top < 0 || colliderObj.bottom > collidedObj.height) {
        colliderObj.vel.y = -colliderObj.vel.y;
      }
    }
    if (collidedObj === this.players[0] || this.players[1]) {
      if (collidedObj.left < colliderObj.right && collidedObj.right > colliderObj.left &&
          collidedObj.top < colliderObj.bottom && collidedObj.bottom > colliderObj.top) {
        colliderObj.vel.x = -colliderObj.vel.x;
        colliderObj.vel.len *= 1.05;
      }
    }
  }

  loop(time) {
    this.removeRect(this.ball)
    this.players.forEach(player => this.removeRect(player));
    
    this.ball.pos.x += this.ball.vel.x * time;
    this.ball.pos.y += this.ball.vel.y * time;
    this.collide(this.ball, this._canvas);

    this.dividers.forEach(divider => this.drawRect(divider));

    this.players[1].pos.y = this.ball.pos.y;
    this.players.forEach(player => this.collide(this.ball, player));

    this.drawRect(this.ball);
    this.players.forEach(player => this.drawRect(player));
  }
}

const pong = new Pong(canvas);
