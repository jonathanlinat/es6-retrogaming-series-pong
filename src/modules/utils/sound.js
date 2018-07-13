export default class Sound {
  constructor () {
    this.disabled = false
    this.oscillator = null
    this.gainNode = null

    this.audioContext = new AudioContext()
  }

  disable () {
    this.disabled = true
  }

  generate (type = '', duration = 0, frequency = 0) {
    if (!this.disabled) {
      this.oscillator = this.audioContext.createOscillator()
      this.gainNode = this.audioContext.createGain()

      this.oscillator.connect(this.gainNode)
      this.oscillator.type = type
      this.oscillator.frequency.value = frequency

      this.gainNode.connect(this.audioContext.destination)
      this.oscillator.start(0)

      this.gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + (duration / 1000))
    }
  }
}
