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
      pos: new ex.Vector(x, y),
      fontSize: size,
      textAlign: ex.TextAlign.Center,
      baseAlign: ex.BaseAlign.Middle,
      color: ex.Color.Red
    })

    this.onInitialize=()=>{
      this.setZIndex(5)
    }
  }
}
```
Den `super`-Konstruktor führen wir mit den Parametern unseres `new ex.Label(...)` Aufrufs von letztem Mal aus und erzeugen so das gleiche Symbol, nur die neuen Parameter `size`, `x` und `y` übergeben wir jetzt.

Außerdem setzen wir, `onInitialize` also wenn es initializiert wird, den Z-Index, also wie weit oben es gerendert wird auf 5, damit es auf jeden fall über und nicht unter den Gegnern angezeigt wird.

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

Wenn ihr VSCode benutzt, könnt ihr für oft verwendete Actionen eine Aufgabe anlegen, um diese schnell ausführen zu können. Im normalfall, sollte VSCode selbstständig Tasks für dieses Projekt angelegt haben, um einen davon auszuführen, könnt ihr entweder über `Strg + ⇧ + P` die Befehlsleiste öffnen und `Run Task` ausführen, oder ihr klickt auf `Terminal ⇾ Run Task` in der Menüleiste.

Wenn die Aufgabe `npm: dev` angezeigt wird, dann könnt ihr diesen einfach Auswählen, und dann `Never scan the task output`, um das Spiel zu starten.

Wenn die Aufgabe nicht vorhanden ist oder ihr lieber einen anderen Namen hättet, dann könnt ihr im Wurzelverzeichnis des Projekts die Datei `.vscode/tasks.json` anlegen, bzw. öffnen, wenn sie schon vorhanden ist und mit dem folgenden füllen:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558 
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Game",
            "type": "npm",
            "script": "dev",
            "problemMatcher": []
        }
    ]
}
```

Wenn ihr jetzt die Aufgabenliste wieder aufruft, könnt ihr die gerade angelegte Aufgabe `Run Game` ausführen. Wenn ihr das Terminal unten am Bildschirm nicht angezeigt bekommt, könnt ihr auf die laufenden Aufgaben über `Show Running Tasks` jederzeit zugreifen. Um eine Aufgabe zu beenden, könnt ihr, wenn das Terminal geöffnet ist, auf das kleine Mülleimer Symbol oben rechts klicken, alternativ über `Terminate Task` beenden.

Das Terminal könnt ihr jederzeit mit dem `x` in der Ecke verstecken.

## Mehr UI

Im Folgenden werden wir noch zwei weitere UI Elemente hinzufügen.

### Punkteanzeige

In `ui.ts` fügen wir eine zweite Klasse hinzu, `PointDisplay`:

```typescript
export class PointDisplay extends ex.Label {
  value = 0
  name = ""
  constructor(name: string, startingValue: number, size: number, x: number, y: number) {
    super({
      text: name + startingValue,
      pos: new ex.Vector(x, y),
      fontSize: size
    })
    this.value = startingValue
    this.name = name
  }
}
```
`export` steht dabei für eine Klasse, die öffentlich ist, vergleichbar mit `public` in z. B. Java, ohne `export` könnten wir die Klassen nur in `ui.ts` benutzen, nicht aber in `index.ts`.

Mit `value = 0` und `name = ""` erzeugen wir neue Eigenschaft von PointDisplay, die wir dann verändern, und lesen können. Im Konstruktor setzen wir sie auf den Wert der Parameter `startingValue` bzw. `name`.

Damit der Punktestand hochgezählt werden kann fügen wir die Methode `addPoints(points)` hinzu:

```typescript
public addPoints(points: number) {

}
```
Um zum einen die Anzeige zu aktualliesiern und zum andreren value hochzuzählen brauchen wir jetzt nur zwei Zeilen:

```typescript
public addPoints(points: number) {
  // Addiert points zu value
  this.value += points
  // Setzt den angezeigten Text auf name value
  this.text = this.name + this.value
}
```

Die vollständige Klasse ist dann:

```typescript
export class PointDisplay extends ex.Label {
  value = 0
  name = ""

  constructor(name: string, startingValue: number, size: number, x: number, y: number) {
    super({
      text: name + startingValue,
      pos: new ex.Vector(x, y),
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
```

### Magazin Anzeige

Die Magazinanzeige zeigt an, wie viele Schüsse noch übrig sind, dafür verwenden wir das `💣`-Symbol.

Die Klasse wieder so ähnlich wie vorhin:

```typescript
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
    // Addiert points zu value
    this.value += shells
    this.text = "💣".repeat(this.value)
  }
}
```
`"💣".repeat(number)` wiederholt `💣` `number` oft, beispielsweise resultiert `"💣".repeat(8)` in `"💣💣💣💣💣💣💣💣"`.

## Die Gegner

Für die Gegner legen wir eine neue Datei an, `enemy.ts`. Die Klasse Enemy erbt nun direkt von Actor:

```typescript
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
```

## Die Scene

In der `index.ts` fügen wir zuerst die beiden UI-Elemente hinzu:

```typescript
var magazine = new MagazineDisplay(5,50,game.canvasWidth-10,70)
// Das Magazin ist rechtsbündig
magazine.textAlign=ex.TextAlign.Right
game.add(magazine)
```
Oben müssen wir die `import` Anweisung erweitern:
```typescript
import { Crosshair, PointDisplay, MagazineDisplay } from './ui';
```

In der `game.input.pointers.primary.on('down', ...)` Funktion löschen wir alles und schreiben stattdessen:

```typescript
game.input.pointers.primary.on('down', function (evt) {
  magazine.addShells(-1)
})
```

Wenn wir jetzt klicken verschwinden oben rechts die Patronen.

Nun fügen wir einen der Gegner ein, wenn wir ihn Treffen, bekommen wir 5 Punkte.

```typescript
var enemy = new Enemy(game.canvasWidth / 2, game.canvasHeight / 2)
game.add(enemy)
```
Hier brauchen wir auch wieder die `import` Anweisung:

```typescript
import { Enemy } from './enemy';
```
Für die Punkte bei klicken mit der Maus:

```typescript
enemy.on("pointerdown", evt => {
  points.addPoints(5)
  // Entfernt den Gegner
  enemy.kill()
})
```

Einen zweiten Gegner können wir auch hinzufügen:

```typescript
var enemy2 = new Enemy(game.canvasWidth / 2+100, game.canvasHeight / 2)
game.add(enemy2)

enemy2.on("pointerdown", evt => {
  points.addPoints(5)
  // Entfernt den Gegner
  enemy2.kill()
})
```

Wenn die Patronen alle sind, können wir einfach das Spiel neustarten, dafür fügen wir bei unserem Eventhandler für die normalen Mausklicks hinzu:

```typescript
game.input.pointers.primary.on('down', function (evt) {
  magazine.addShells(-1)
  if(magazine.value<=0)
    location.reload()
})
```