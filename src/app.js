const canvas = document.getElementById("es6-retrogaming-series-pong");
canvas.width = 320;
canvas.height = 240;

class Vect {
  constructor(axisX, axisY) {
    this.x = axisX || 0;
    this.y = axisY || 0;
  }

  get hypot() { return Math.hypot(this.x, this.y); }
  set hypot(value) {
    const fact = value / this.hypot;
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

class Divider extends Rect {
  constructor(posX, posY) {
    super(2, 8);

    this.pos.x = posX || 0;
    this.pos.y = posY || 0;
  }
}

class Score {
  constructor(posX, posY) {
    this.pos = new Vect;
    this.pos.x = posX || 0;
    this.pos.y = posY || 0;
  }
}

class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");

    this.globalVel = 200;
    
    this.ball = new Ball(this._canvas.width / 2, this._canvas.height / 2);
    this.players = [
      new Player(this._canvas.width / 6, this._canvas.height / 2),
      new Player((this._canvas.width / 6) * 5, this._canvas.height / 2)
    ];
    this.divider = new Divider();
    this.dividers = [];
    for (let i = 0; i < (this._canvas.height / this.divider.size.y); i++) {
      this.dividers.push(
        new Divider(this._canvas.width / 2, (i * this.divider.size.y) * (this.divider.size.y / (this.divider.size.y / 2)))
      );
    }
    this.scores = [
      new Score(this._canvas.width / 3, this._canvas.height / 4),
      new Score((this._canvas.width / 3) * 2, this._canvas.height / 4)
    ];

    let lastTime;
    const callback = (millis) => {
      if (lastTime) {
        this.gameLoop((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();
    
    this.playerControl();
  }

  drawRect(obj) {
    if (obj === this.ball && obj.vel.x === 0 && obj.vel.y == 0) {
      this.clearRect(obj);
    } else {
      this._context.fillStyle = "white";
      this._context.fillRect(obj.left, obj.top, obj.size.x, obj.size.y);
    }
  }

  clearRect(obj) {
    this._context.clearRect(obj.left - 1, obj.top - 1, this._canvas.width, this._canvas.height);
  }

  drawScore(playerId) {
    this._context.font = "32px Arial";
    this._context.fillText(this.players[playerId].score, this.scores[playerId].pos.x - (this._context.measureText(this.players[playerId].score).width / 2), this.scores[playerId].pos.y);
  }

  clearScore() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  startGame() {
    if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
      this.ball.vel.x = this.globalVel * (Math.random() > 0.5 ? 1 : -1);
      this.ball.vel.y = this.globalVel * (Math.random() * 2 - 1);
    }
  }
    
  resetGame() {
    this.ball.pos.x = this._canvas.width / 2;
    this.ball.pos.y = this._canvas.height / 2;
    this.ball.vel.x = this.ball.vel.y = 0;
  }

  playerControl(event) {
    this._canvas.addEventListener("click", event => {
      if (this.ball.vel.x === 0 || this.ball.vel.y === 0) {
        this.startGame();
      }
    });

    this._canvas.addEventListener("mousemove", event => {
      this.clearRect(this.players[0]);
      this.players[0].pos.y = event.offsetY;
    });
  }

  aiControl() {
    this.players[1].pos.y = this.ball.pos.y;
  }

  positionBallOverTime(time) {
    this.ball.pos.x += this.ball.vel.x * time;
    this.ball.pos.y += this.ball.vel.y * time;
  }

  onCollide(colliderObj, collidedObj) {
    if (collidedObj === this._canvas) {
      if (colliderObj.left < 0 || colliderObj.right > collidedObj.width) {
        const playerId = colliderObj.left < 0 ? 1 : 0;
        this.players[playerId].score++;
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
        colliderObj.vel.hypot *= 1.05;
      }
    }
  }

  gameLoop(time) {
    this.clearRect(this.ball);
    this.players.forEach(player => this.clearRect(player));
    this.dividers.forEach(divider => this.clearRect(divider));
    this.scores.forEach(score => this.clearScore());
    
    this.positionBallOverTime(time);
    this.aiControl();

    this.onCollide(this.ball, this._canvas);
    this.players.forEach(player => this.onCollide(this.ball, player));

    this.drawRect(this.ball);
    this.players.forEach(player => this.drawRect(player));
    this.dividers.forEach(divider => this.drawRect(divider));
    this.scores.forEach((score, index) => this.drawScore(index));
  }
}

const pong = new Pong(canvas);
