import * as ex from 'excalibur'
import { Vector } from 'excalibur'
import { loadTexture, playingField } from './util'
import { randomInRange } from 'excalibur/dist/Util/Util'
export class Crosshair extends ex.Label {
  constructor(size: number, x: number, y: number) {
    super({
      text: '⊕',
      pos: new Vector(x, y),
      fontSize: size,
      textAlign: ex.TextAlign.Center,
      baseAlign: ex.BaseAlign.Middle,
      color: ex.Color.Red
    })
    this.onInitialize = () => {
      this.setZIndex(5)

    }
  }
}

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

var truckSprite: ex.Sprite
loadTexture("truck.png", (tex) => truckSprite = tex.asSprite())

export class Truck extends ex.Actor {
  speed: number
  static minSpeed: number = 10
  static speedRange: number = 10
  constructor() {
    super()
    this.speed = Math.random() * Truck.speedRange + Truck.minSpeed
    this.on("initialize", () => {
      this.addDrawing(truckSprite)
      this.speed = Math.random() > 0.5 ? -this.speed : this.speed;
      this.pos.x = this.speed > 0 ? -this.width : playingField.x + this.width;
      this.pos.y = Math.random() * playingField.h + playingField.y1;
      console.log(playingField);
      console.log("why is this not running", this.width, this.height)
    })
  }
  public update(engine, delta) {
    this.pos.x += this.speed * delta / 1000;
    // console.log(this.x, this.y);
  }
}