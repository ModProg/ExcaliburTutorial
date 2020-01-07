import * as ex from 'excalibur'
import { playingField } from './util';
import { Vector } from 'excalibur';
import { Textures } from './resources';


export class Truck extends ex.Actor {
    static minSpeed: number = 100
    static speedRange: number = 20
    constructor() {
        super()
        this.vel.x = Math.random() * Truck.speedRange + Truck.minSpeed
    }

    onInitialize() {
        this.addDrawing(Textures.Truck)
        this.vel.x = Math.random() > 0.5 ? -this.vel.x : this.vel.x;
        this.currentDrawing.scale = new ex.Vector(0.5, 0.5);
        this.currentDrawing.flipHorizontal = this.vel.x > 0;
        this.height = this.currentDrawing.drawHeight;
        this.width = this.currentDrawing.drawWidth;
        this.pos.x = this.vel.x > 0 ? playingField.x1 - this.width / 2 : playingField.x2 + this.width / 2;
        this.pos.y = Math.random() * (playingField.h - this.height / 2) + this.height / 2 + playingField.y1;
        // BackTrigger:
        let trigger = new ex.Actor()
        trigger.width = 120
        trigger.height = 50
        trigger.color = ex.Color.Red;
        trigger.pos.x = -60 * Math.sign(this.vel.x);
        this.add(trigger);
    }
}

export class Boxchute extends ex.Actor {
    constructor(x: number, y: number) {
        super(x, y)
    }
    onInitialize() {
        this.addDrawing(Textures.Boxchute);
        this.currentDrawing.scale = new Vector(.5, .5)
        this.currentDrawing.anchor.y = 0.3
        this.add(new ex.Actor())
        this.children[0].width = 90;
        this.children[0].height = 90;
        this.children[0].color = ex.Color.Black;
    }
}