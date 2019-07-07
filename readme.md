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

Im Folgenden werden wir weitere UI Elemente hinzufügen.

### Punkteanzeige

In `ui.ts` fügen wir eine zweite Klasse hinzu, `PointDisplay`:
