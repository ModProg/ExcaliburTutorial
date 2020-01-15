import * as ex from 'excalibur'
import { playingField, fromRange, map, VecN, follow } from './util'
import { Textures, CollisionGroups } from './resources'
import { points } from '.'


export class Truck extends ex.Actor {
    static minSpeed: number = 100
    static speedRange: number = 20
    constructor() {
        super()
        this.vel.x = Math.random() * Truck.speedRange + Truck.minSpeed
    }

    onInitialize() {
        this.addDrawing(Textures.Truck)
        this.currentDrawing.scale = new ex.Vector(0.5, 0.5)

        this.vel.x = Math.random() > 0.5 ? -this.vel.x : this.vel.x
        this.currentDrawing.flipHorizontal = this.vel.x > 0

        this.width = this.currentDrawing.drawWidth
        this.height = this.currentDrawing.drawHeight
        this.pos.x = this.vel.x > 0 ? playingField.x1 - this.width / 2 : playingField.x2 + this.width / 2
        this.pos.y = Math.random() * (playingField.h - this.height / 2) + this.height / 2 + playingField.y1


        // Damit nur die Collider kollidieren
        this.body.collider.type = ex.CollisionType.PreventCollision

        // BackTrigger für Erfolg
        let trigger = new ex.Actor(-60 * Math.sign(this.vel.x), 0, 120, 50)
        trigger.body.collider.group = ex.CollisionGroupManager.groupByName("back")
        follow(trigger, this, new VecN(-60 * Math.sign(this.vel.x), 0))
        this.scene.add(trigger)

        // FrontCollider für Fehler
        let collider1 = new ex.Actor(30 * Math.sign(this.vel.x), -10, 40, 80)
        collider1.body.collider.group = ex.CollisionGroupManager.groupByName("front")

        follow(collider1, this, new VecN(30 * Math.sign(this.vel.x), -10))
        this.scene.add(collider1)

        let collider2 = new ex.Actor(70 * Math.sign(this.vel.x), 5, 60, 40)
        collider2.body.collider.group = ex.CollisionGroupManager.groupByName("front")

        follow(collider2, this, new VecN(70 * Math.sign(this.vel.x), 5))
        this.scene.add(collider2)
    }
}

export class Boxchute extends ex.Actor {
    loc = 0
    // Wenn der Boxchute niedriger ist kollidiert er
    static collide_height = 12

    static max_scale = 1
    static min_scale = 0.2

    static fallSpeed = 0.04
    starting_height = 25

    constructor(x: number, y: number, z = 25) {
        super(x, y)
        this.loc = this.starting_height = z

    }

    onInitialize() {
        this.addDrawing(Textures.Boxchute.asSprite().clone())
        this.currentDrawing.scale = new ex.Vector(Boxchute.max_scale, Boxchute.max_scale)
        this.currentDrawing.anchor.y = 0.3

        this.body.collider.type = ex.CollisionType.PreventCollision
        let collider = new ex.Actor(0, 0, 50, 50)
        collider.body.collider.on("collisionstart", (event) => {

            if (this.loc <= Boxchute.collide_height)
                switch (event.other.group) {
                    case CollisionGroups.back:
                        points.addPoints(5)
                    case CollisionGroups.front:
                        collider.kill()
                        this.kill()
                }
        })

        follow(collider, this, new VecN())
        this.scene.add(collider)
    }

    onPreUpdate(any, delta: number) {
        if (this.loc > 0) {
            this.loc -= Boxchute.fallSpeed * delta
            this.pos.y += Boxchute.fallSpeed * delta * 10
            this.currentDrawing.scale = new VecN(fromRange(map(this.loc, this.starting_height, 0), Boxchute.max_scale, Boxchute.min_scale))
        }
    }
}