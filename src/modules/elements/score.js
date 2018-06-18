import Drawing from './../utils/drawing'

export default class Score {
  constructor (pixelSize = 0, pixelsByRow = 0) {
    this.pixelSize = pixelSize
    this.pixelsByRow = pixelsByRow
    this.numbersList = [
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

    this.drawing = new Drawing()
  }

  render (canvas = {}, player = [], playerId = 0) {
    this.playerScore = player[playerId].score.toString().split('')

    this.playerScore.forEach((k, l) => {
      this.numbersList[k].split('').forEach((m, n) => {
        if (m === '1') {
          this.positionX = {
            drawEachPixelByRow: ((n % this.pixelsByRow) * this.pixelSize),
            setSpaceBetweenEachNumber: ((l * this.pixelsByRow) * (this.pixelSize + (this.pixelSize / 2))),
            positionEachScoreOnCanvas: ((canvas.width / 4) * (playerId === 0 ? 3 : 1)),
            setOffsetFromLeftOfCanvas: (((this.pixelSize * 2) * this.playerScore.length) + ((this.pixelSize * this.playerScore.length) / (this.pixelSize * this.playerScore.length) * 2))
          }
          this.positionY = {
            drawEachPixelByColumn: ((n / this.pixelsByRow | 0) * this.pixelSize),
            setOffsetFromTopOfCanvas: 32
          }
          this.drawing.drawRect(
            canvas,
            this.positionX.drawEachPixelByRow + this.positionX.setSpaceBetweenEachNumber + this.positionX.positionEachScoreOnCanvas - this.positionX.setOffsetFromLeftOfCanvas,
            this.positionY.drawEachPixelByColumn + this.positionY.setOffsetFromTopOfCanvas,
            this.pixelSize,
            this.pixelSize
          )
        }
      })
    })
  }
}
