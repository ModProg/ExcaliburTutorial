import * as ex from 'excalibur'
import { Vector } from 'excalibur'
import { loadTexture, playingField } from './util'


export class PointDisplay extends ex.Label {
  value = 0
  name = ""

  constructor(name: string, startingValue: number, size: number, x: number, y: number) {
    super({
      text: name + startingValue,
      pos: new Vector(x, y),
      fontSize: size
    })
    this.value = startingValue
    this.name = name
  }

  public addPoints(points: number) {
    // Addiert points zu value
    this.value += points
    // Setzt den angezeigten Text auf name value
    this.text = this.name + this.value
  }
}

var font: ex.SpriteFont
loadTexture("parachute.png", (tex) => {
  console.log(tex)
  font = new ex.SpriteFont(tex, 'a', false, 1, 1, 200, 348)
  console.log("font", font)
})

export class MagazineDisplay extends ex.Label {
  value = 0

  constructor(startingValue: number, size: number, x: number, y: number) {
    super({
      text: "a".repeat(startingValue),
      pos: new Vector(x, y),
      fontSize: size
    })
    this.value = startingValue
  }
  onInitialize() {
    this.spriteFont = font
  }


  public addShells(shells: number) {
    // Addiert points zu value
    this.value += shells
    this.text = "a".repeat(this.value)
  }
}

