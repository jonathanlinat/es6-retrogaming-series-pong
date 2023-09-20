# ES6 Retrogaming Series: Pong

![Pong Game](https://image.ibb.co/fkNNfd/es6_atari_pong_screenshot.png)

An ES6 attempt to reimplement the classic [Atari Pong game](https://en.wikipedia.org/wiki/Pong), initially released in 1972.

## Installation

Clone this repository locally...

```
$ git clone https://github.com/jonathanlinat/es6-retrogaming-series-pong.git
$ cd es6-retrogaming-series-pong/
```

...and install the required NPM dependencies.

```
$ pnpm install
```

### Start a Development server

Start a local Web Server.

```
$ pnpm run start
```

### Build a Production version

Create a Production version of the game.

```
$ pnpm run build
```

The _compiled_ version of the game will be available into the `dist` folder.

## Gameplay

Start a new game clicking on the black background. Use your mouse to move the paddles. If one of the players reach the final score of 11, he wins the game.

## References

Sound effects are based on those two references:

* [Caprani, Ole - The PONG Game](https://web.archive.org/web/20190107195557/http://cs.au.dk:80/~dsound/DigitalAudio.dir/Greenfoot/Pong.dir/Pong.html)
* [Generate Sounds Programmatically With Javascript](http://marcgg.com/blog/2016/11/01/javascript-audio/)

Actual design and gameplay are based on the DICE version of Pong:

* [DICE - Discrete Integrated Circuit Emulator](https://adamulation.blogspot.com)
