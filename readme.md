# Let's Game Teil 2

Ich hoffe ich nehme das jetzt auch schnell auf, damit die beiden Teile zusammen kommen.

## Collision

Um die Punkte zu vergeben nutzen wir die Physics-Engine von Excalibur, wobei hierbei einige Kleinigkeiten beachtet werden müssen, wie ich schmerzlich erfahren musste, der Grund warum das alles so lange gedauert hat, aber der Reihe nach.

Zuerst brauchen wir Hitboxen für unseren Truck und den Boxchute.

für meine Textur sind das beim Truck:

``` typescript
let trigger = new ex.Actor(-60, 0, 120, 50)

let collider1 = new ex.Actor(30, -10, 40, 80)

let collider2 = new ex.Actor(70, 5, 60, 40)
```

Normalerweise, sollte man die jetzt einfach als Kind zum `Truck` hinzufügen können, da in dem Bereich Excalibur aber nicht so 100% so funktioniert wie ich dachte habe ich in `utils.ts` eine kleine Funktion namens `follow` gebaut, die nichts anderes macht als den `actor` zum `target` zu verschieben, wobei wir unsere relativen Koordinaten in `offset` packen:

``` typescript
export function follow(actor: ex.Actor, target: ex.Actor, offset: ex.Vector) {
  actor.on("preupdate", () => actor.pos = target.pos.add(offset))
}
```

Mit dieser anpassung können wir das dann zusammen setzen, indem wir folgendes in `onInitialize` des `Truck`s packen:

``` typescript
// Trigger für Erfolg
let trigger = new ex.Actor(0, 0, 120, 50)
follow(trigger, this, new VecN(-60 * Math.sign(this.vel.x), 0))
this.scene.add(trigger)

// FrontCollider für Fehler
let collider1 = new ex.Actor(0, 0, 40, 80)
follow(collider1, this, new VecN(30 * Math.sign(this.vel.x), -10))
this.scene.add(collider1)

let collider2 = new ex.Actor(0, 0, 60, 40)
follow(collider2, this, new VecN(70 * Math.sign(this.vel.x), 5))
this.scene.add(collider2)
```

Um zu gucken ob die Hitboxen richtig sitzen, nutzen wir den Debug Modus. Zum Aktivieren fügen wir die Zeile:
`game.isDebug = true` in unsere `main` Methode.

Alternativ können wir auch eine kleine Funktion schreiben um per Tastendruck zu wechseln:

``` typescript
// Wird aufgerufen wenn eine Taste gedrückt wird
game.input.keyboard.on("press", (event) => {
    // Testet ob es die Taste `D` ist
    if (event.key == ex.Input.Keys.D)
        // Wenn ja, wechsele den Debug modus (an/aus)
        game.isDebug = !game.isDebug
})
```

Wenn wir jetzt `D` drücken, sehen wir das unsere Boxen zwar vieleicht nicht ganz genau passen, aber gut genug um weiter zu machen.

Um bei einer Kollision `trigger` und `collider` unterscheiden zu können, verwenden wir `CollisionGroup`s.

In `resources.ts` erzeugen wir zwei Gruppen `back` und `front` :

``` typescript
export const CollisionGroups = {
    back: ex.CollisionGroupManager.create("back"),
    front: ex.CollisionGroupManager.create("front")
}
```

Die können dann in `objects.ts` genutzt werden um sie den einzelnen Hitboxen zu zuordnen.

``` typescript
// Trigger für Erfolg
let trigger = new ex.Actor(0, 0, 120, 50)
trigger.body.collider.group = CollisionGroups.back;
follow(trigger, this, new VecN(-60 * Math.sign(this.vel.x), 0))

this.scene.add(trigger)

// FrontCollider für Fehler
let collider1 = new ex.Actor(0, 0, 40, 80)        
collider1.body.collider.group = CollisionGroups.front;
follow(collider1, this, new VecN(30 * Math.sign(this.vel.x), -10))

this.scene.add(collider1)

let collider2 = new ex.Actor(0, 0, 60, 40)
collider2.body.collider.group = CollisionGroups.front;
follow(collider2, this, new VecN(70 * Math.sign(this.vel.x), 5))

this.scene.add(collider2)
```

Damit sie nicht mit der Textur selber kollidieren gibt verpassen wir dem `Truck` selber in `onInitialize` noch:

``` typescript
// Damit nur die Collider kollidieren
this.body.collider.type = ex.CollisionType.PreventCollision
```

Diese können wir dann in `BoxChute.onInitialize` nutzen:

``` typescript
// Verhindert Collision der Textur
this.body.collider.type = ex.CollisionType.PreventCollision
// Hitbox
let collider = new ex.Actor(0, 0, 50, 50)
// Wird gefeuert, wenn zwei Collider sich berühren
collider.body.collider.on("collisionstart", (event) => {
    // Kollidiert nur wenn der `Boxchute` niedrig genug ist
    if (this.loc <= Boxchute.collide_height)
        switch (event.other.group) {
            case CollisionGroups.back:
                // Jedes erfolgreiche Landen auf der Ladefläche bringt 5 Punkte
                points.addPoints(5)
            case CollisionGroups.front:
                // Ansonsten verschwindet der `Boxchute` 
                collider.kill()
                this.kill()
        }
})
// VecN erzeugt einen Vector mit den Koordinaten (0,0), in `utils.ts` definiert
follow(collider, this, new VecN())
this.scene.add(collider)
```

Damit wir `points` in `objects.ts` verändern können müssen wir es in `index.ts`  `export`ieren, indem wir die Erzeugung vor `main` ziehen:
```typescript
export const points = new PointDisplay("Score: ", 0, 50, 10, 70)
```

Jetzt bekommen wir 5 Punkte wenn die Kiste genau im Truck landet, und der Fallschirm wird zerstört wenn er mit dem Truck kollidiert.