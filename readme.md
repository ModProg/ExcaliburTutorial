# Let's Game

Moin Kinners nach Corona und Prüfungsstress... Zeit für ein bisschen Spiel:

## Aufräumen

Wir löschen als erstes `enemy.ts` , natürlich auch den Verweis in `index.ts` .
Und die beiden `Enemy` 's in `index.ts` .
Wenn wir jetzt das Spiel mit unserem Task starten, haben wir nur die Hud-Elemente.

## Utils

Als nächstes bauen wir uns eine kleine Utility-Bibliothek, da dies zu lange dauerte hier zu erläutern verlinke ich sie nur. Die meisten Sachen habe ich in den Kommentaren erläutert.

## Objects

Da wir mit der `enemy.ts` alle unsere interaktiven Elemente entfernt haben brauchen wir neue, wir fangen mit dem Boxchute an:

``` typescript
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
}
```

Wir nehmen erst mal diese Werte, wenn sie uns später nicht gefallen, können wir sie immernoch ändern.

Damit wir ihn jetzt auch sehen können verwenden wir unsere Boxchute Texture von letztem mal in der `onInitialize()` Funktion, die ja bei der Erzeugung des Objekts aufgerufen wird.

``` typescript
onInitialize() {
    this.addDrawing(Textures.Boxchute.asSprite().clone())
    this.currentDrawing.scale = new ex.Vector(Boxchute.max_scale, Boxchute.max_scale)
    this.currentDrawing.anchor.y = 0.3
}
```

Dabei verschiebt das `this.currentDrawing.anchor` den "Aufhängepunkt" des Bildes um besser zur Texture zu passen, wenn ihr andere Texturen verwendet, müsst ihr das natürlich anpassen.

Bisher hatten wir uns bei der Klick-Aktion auf das angeklickte Objekt verlassen, dies ändern wir jetzt, und fügen in `game.input.pointers.primary.on('down', function (evt){` die folgenden Zeilen ein, die einen Boxchute an der Position des Cursers erzeugen:

``` typescript
let bc = new Boxchute(evt.target.lastWorldPos.x, evt.target.lastWorldPos.y)
game.add(bc)
```

Damit dieser wie für Fallschirme üblich fällt, erweitern wir die Klasse um eine Funktion `onPreUpdate(any, delta: number)` , diese wir immer ausgeführt bevor die restliche Update-Routine läuft.

``` typescript
onPreUpdate(any, delta: number) {
    if (this.loc > 0) {
        this.loc -= Boxchute.fallSpeed * delta
        this.pos.y += Boxchute.fallSpeed * delta * 10
        this.currentDrawing.scale = new VecN(fromRange(map(this.loc, this.starting_height, 0), Boxchute.max_scale, Boxchute.min_scale))
    }
}
```

Diese macht nichts anderes als den `Boxchute` mit `fallSpeed` "fallen" zu lassen. Dabei bewegt er sich nach unten, wird aber auch kleiner, durch die Änderung von `this.currentDrawing.scale` .

Jetzt brauchen wir noch etwas zum "abwerfen", dafür nehmen wir die Truck-Textur von letztem mal.

``` typescript
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

    }
}
```

Da er so aber nichts macht, und ja auch nicht vom Spieler gesteuert, bauen wir ein System um ihn zufällig zu spawnen.
Dazu verwenden wir das `playingField` in `util.ts` :

``` typescript
// wählt zufällig eine positive oder negative Geschwindigkeit. (fährt nach rechts bzw. links)
this.vel.x = Math.random() > 0.5 ? -this.vel.x : this.vel.x
// Spiegelt wenn nötig die Textur, abhängig von eurer, 
// müsst ihr das möglicherweise anders herrum machen, d.h. >0.
this.currentDrawing.flipHorizontal = this.vel.x > 0
// Setzt Breite und Höhe auf die der Texture.
this.width = this.currentDrawing.drawWidth
this.height = this.currentDrawing.drawHeight

// Positioniert, den Truck gerade so außerhalb, sodass man das spawnen nicht beobachten kann.
this.pos.x = this.vel.x > 0 ? playingField.x1 - this.width / 2 : playingField.x2 + this.width / 2
this.pos.y = Math.random() * (playingField.h - this.height / 2) + this.height / 2 + playingField.y1
```

solange wir jedoch das `playingField` nicht festlegen, funktioniert das noch nicht.

Dafür erweitern wir unsere `main` Funktion in `index.ts` , gleich als am Anfang:
``` typescript
playingField.x1 = 0
playingField.x2 = game.canvas.width
playingField.y1 = 150
playingField.y2 = game.canvas.height - 60
```

Die +150 und -60 dienen dazu oben und unten etwas Platz für das HUD freizuhalten.

Wenn wir jetzt einen Truck erzeugen, sehen wir, dass er so wie vorgesehen über den Bildschirm fährt:

```typescript
var truck = new Truck()
game.add(truck)
```

In Teil zwei bauen wir dann eine einfache Punktelogik.