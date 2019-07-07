import * as ex from 'excalibur';
export class Crosshair extends ex.Label {
  constructor(size: number, x: number, y: number) {
    super({
      text: '⊕',
      x: x,
      y: y,
      fontSize: size,
      textAlign: ex.TextAlign.Center,
      baseAlign: ex.BaseAlign.Middle
    })
  }
}
