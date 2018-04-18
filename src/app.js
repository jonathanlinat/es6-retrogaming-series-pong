const canvas = document.getElementById("pong")
const context = canvas.getContext("2d")

class Vect {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(w, h) {
    this.pos = new Vect;
    this.size = new Vect(w, h);
  }
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vect;
  }
}

class Player extends Rect {
  constructor() {
    super(25, 200);
  }
}

const ball = new Ball;
ball.pos.x = 100;
ball.pos.y = 50;

context.fillStyle = "white"
context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y)

const player = new Player;
player.pos.x = 0;
player.pos.y = 0;

context.fillStyle = "white"
context.fillRect(player.pos.x, player.pos.y, player.size.x, player.size.y)
