# Klassen

Moin Kinn’ers, nachdem wir bisher alles in der `index.ts` Datei implementiert haben, werden wir diesmal etwas aufräumen und einige Dinge in andere Klassen auslagern.

## Fadenkreuz
Dafür legen wir die Datei `src/ui.ts` an und erzeugen dort die Klasse `Crosshair`, die die Klasse `ex.Label` erweitert.

```typescript
import * as ex from 'excalibur';
export class Crosshair extends ex.Label {

}
```
Diese Klasse soll jetzt die Darstellung des Fadenkreuzes übernehmen. Damit wir auch eine Instanz davon erzeugen können, müssen wir einen `constructor` anlegen:

```typescript
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
```
Den `super`-Konstruktor führen wir mit den Parametern unseres `new ex.Label(...)` Aufrufs von letztem Mal aus und erzeugen so das gleiche Symbol, nur die neuen Parameter `size`, `x` und `y` übergeben wir jetzt.

In der `index.ts` ersetzen wir den Aufruf 

```typescript
var crosshair = new ex.Label(...)
```

durch 

```typescript
var crosshair = new Crosshair(150, game.canvasWidth / 2, game.canvasHeight / 2)
```

Wenn ihr `Crosshair` mit autovervollständigt habt, entfällt möglicherweise der nächste Schritt, weil z. B. VSCode dann selbstständig die notwendige Zeile

```typescript
import { Crosshair } from './ui';
```

am Anfang der Datei anfügt. Sollte diese noch fehlen, einfach ergänzen.

## Tasks

Wenn ihr VSCode benutzt, könnt ihr für oft verwendete Actionen eine Aufgabe anlegen, um diese schnell ausführen zu können. Im normalfall, sollte VSCode selbstständig Tasks für dieses Projekt angelegt haben, um einen davon auszuführen, könnt ihr entweder über `Strg + 

