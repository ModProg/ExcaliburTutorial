import * as ex from 'excalibur'
/**
 * A Simple rectangle, with position, size and corner coordinates
 */
export class Rect extends ex.Vector {
    x1 = 0;
    x2 = 0;
    y1 = 0;
    y2 = 0;

    constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
        super(0, 0)
        this.x1 = x1 < x2 ? x1 : x2
        this.x2 = x2 > x1 ? x2 : x1
        this.y1 = y1 < y2 ? y1 : y2
        this.y2 = y2 > y1 ? y2 : y1
    }

    get w() { return this.x2 - this.x1 }
    set w(v: number) {
        let x = this.x
        this.x1 = x - v / 2
        this.x2 = x + v / 2
    }

    get h() { return Math.abs(this.y1 - this.y2) }
    set h(v: number) {
        let y = this.y
        this.y1 = y - v / 2
        this.y2 = y + v / 2
    }

    get y() {
        return this.y1 + (this.y2 - this.y1) / 2
    } set y(v: number) {
        let h = this.h
        this.y1 = v - h / 2
        this.y2 = v + h / 2
    }

    get x() {
        return this.x1 + (this.x2 - this.x1) / 2
    }
    set x(v: number) {
        let w = this.w
        this.x1 = v - w / 2
        this.x2 = v + w / 2
    }


}

/**
 * An advanced Vector implementation, with unlimited coordinates
 */
export class VecN extends ex.Vector {
    private coordinates: number[] = []


    public get x(): number {
        return this.coordinates.length ? this.coordinates[0] : 0
    }
    public get y(): number {
        return this.coordinates.length ? this.coordinates.length == 1 ? this.coordinates[0] : this.coordinates[1] : 0
    }
    public get z(): number {
        let z = this.coordinates.length ? this.coordinates.length == 1 ? this.coordinates[0] : this.coordinates[2] : 0
        return z == undefined ? NaN : z
    }
    public get w(): number {
        let w = this.coordinates.length ? this.coordinates.length == 1 ? this.coordinates[0] : this.coordinates[3] : 0
        return w == undefined ? NaN : w
    }
    public set x(v: number) {
        if (this.coordinates)
            this.coordinates[0] = v
    }
    public set y(v: number) {
        if (this.coordinates)
            this.coordinates[1] = v
    }
    public set z(v: number) {
        this.coordinates[2] = v
    }
    public set w(v: number) {
        this.coordinates[3] = v
    }

    public get(index: number) {
        let w = this.coordinates.length ? this.coordinates.length == 1 ? this.coordinates[0] : this.coordinates[index] : 0
        return w == undefined ? NaN : w
    }

    constructor(...coordinates: number[]) {
        super(0, 0)
        this.coordinates = [...coordinates]
    }
}

/**
 * The screen resolution minus the space reserved for HUD
 */
export const playingField: Rect = new Rect()


/**
 * Limits value according to min, max
 * if   value < min => min
 *      value > max => max
 * else => value
 * @param value the value to be limitted
 * @param min upper limit
 * @param max lower limit
 */
export function limit(value: number, min: number, max: number): number {
    return value > max ? max : value < min ? min : value
}


/**
 * Maps to a value from 0 to 1 according to the mapping range
 * value == from        => 0
 * value in the centre  => 0.5
 * value == to          => 1
 * @param value value to scale
 * @param from lower limit of the mapping range
 * @param to upper limit of the mapping range
 */
export function map(value: number, from: number, to: number): number {
    return limit((value - from) / (to - from), 0, 1)
}
/**
 * Linear extra- and intrapolation where 
 * value == 0 => from
 * value == 1 => to
 * @param value the value, that is mapped to range
 * @param from first limit of the range
 * @param to second limit of the range
 */
export function fromRange(value: number, from: number, to: number): number {
    return value * (to - from) + from
}

export function follow(actor: ex.Actor, target: ex.Actor, offset: ex.Vector) {
    actor.on("preupdate", () => actor.pos = target.pos.add(offset))
}
