export default class Sound {
  constructor () {
    this.audioContext = new AudioContext()

    this.oscillator = null
    this.gainNode = null
  }

  generate (type = '', duration = 0, frequency = 0) {
    this.oscillator = this.audioContext.createOscillator()
    this.gainNode = this.audioContext.createGain()

    this.oscillator.connect(this.gainNode)
    this.oscillator.type = type
    this.oscillator.frequency.value = frequency

    this.gainNode.connect(this.audioContext.destination)
    this.oscillator.start(0)

    this.gainNode.gain.exponentialRampToValueAtTime(
      0.00001, this.audioContext.currentTime + (duration / 1000)
    )
  }
}
