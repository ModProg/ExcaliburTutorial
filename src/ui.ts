import * as ex from 'excalibur';

export class Crosshair extends ex.Label {
    constructor(size: number, x: number, y: number) {
        super({
            text: '⊕',
            pos: new ex.Vector(x, y),
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
            pos: new ex.Vector(x, y),
            fontSize: size
        })
        this.value = startingValue;
        this.name = name;
    }

    public addPoints(points: number) {
        this.value += points;
        this.text = this.name + this.value
    }
}

export class MagazineDisplay extends ex.Label {
    value = 0

    constructor(startingValue: number, size: number, x: number, y: number) {
        super({
            text: "💣".repeat(startingValue),
            pos: new ex.Vector(x, y),
            fontSize: size
        })
        this.value = startingValue
    }

    public addShells(shells: number) {
        this.value += shells
        this.text = "💣".repeat(this.value)
    }
}