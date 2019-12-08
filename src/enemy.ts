import * as ex from 'excalibur'

export class Enemy extends ex.Actor {
    constructor(x: number, y: number) {
        super({
            pos: new ex.Vector(x - 40, y - 40),
            width: 80,
            height: 80,
            color: ex.Color.Blue
        })
    }
}