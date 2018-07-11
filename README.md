# ES6 Retrogaming Series: Pong

![Pong Game](https://image.ibb.co/fkNNfd/es6_atari_pong_screenshot.png)

An ES6 attempt to reimplement the classic Atari Pong game, initially released in 1972.

Project mainly based on [Yet Another And Really Basic Webpack ES6 Starterkit](https://github.com/jonathanlinat/yet-another-and-really-basic-webpack-es6-starterkit).

### Installation

Clone this repository locally...

```
$ git clone https://github.com/jonathanlinat/es6-retrogaming-series-pong.git
$ cd es6-retrogaming-series-pong/
```

...and install the required NPM packages.

```
$ npm install
```

### Start Dev Server

Start a local Web Server.

```
$ npm run dev
```

### Build Prod Version

Create a Production version of the game.

```
$ npm run build
```

### Gameplay

Start a new game clicking on the black background. Use your mouse to move the paddles. If one of the players reach the final score of 11, he wins the game.

### References

Sound effects are based on those two references:

* [Caprani, Ole - The PONG Game](http://cs.au.dk/~dsound/DigitalAudio.dir/Greenfoot/Pong.dir/Pong.html)
* [Generate Sounds Programmatically With Javascript](http://marcgg.com/blog/2016/11/01/javascript-audio/)

Actual design and gameplay are based on the DICE version of Pong:

* [DICE - Discrete Integrated Circuit Emulator](https://adamulation.blogspot.com)

### Features

* Webpack 4.15.1
* ES6 Support via [babel-loader](https://github.com/babel/babel-loader)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
* JavaScript Standard Style via [eslint-config-standard](https://github.com/standard/eslint-config-standard)
