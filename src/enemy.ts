import * as ex from 'excalibur'
import { Vector } from 'excalibur';
export class Enemy extends ex.Actor {

    constructor(x: number, y: number) {
        super({
            pos: new Vector(x - 20, y - 20),
            width: 40,
            height: 40,
            color: ex.Color.Blue
        })
    }
}