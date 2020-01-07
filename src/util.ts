import * as ex from 'excalibur';

export class Rect {
    x1 = 0;
    x2 = 0;
    y1 = 0;
    y2 = 0;
    constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
        this.x1 = x1 < x2 ? x1 : x2;
        this.x2 = x2 > x1 ? x2 : x1;
        this.y1 = y1 < y2 ? y1 : y2;
        this.y2 = y2 > y1 ? y2 : y1;
    }
    get w() { return this.x2 - this.x1; }
    set w(v: number) {
        let x = this.x;
        this.x1 = x - v / 2;
        this.x2 = x + v / 2;
    }
    get h() { return Math.abs(this.y1 - this.y2); }
    set h(v: number) {
        let y = this.y;
        this.y1 = y - v / 2;
        this.y2 = y + v / 2;
    }
    get y() {
        return this.y1 + (this.y2 - this.y1) / 2
    } set y(v: number) {
        let h = this.h;
        this.y1 = v - h / 2;
        this.y2 = v + h / 2;
    }
    get x() {
        return this.x1 + (this.x2 - this.x1) / 2
    }
    set x(v: number) {
        let w = this.w;
        this.x1 = v - w / 2;
        this.x2 = v + w / 2;
    }


}

export const playingField: Rect = new Rect();
