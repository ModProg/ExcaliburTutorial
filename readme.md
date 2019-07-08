# Es lebt

Moin Kinn’ers, nachdem wir letztes Mal ein „Hello World“ geschrieben haben, wollen wir das ganze interaktiver machen. Ihr könnt entweder mit eurem Projekt vom letzten Mal arbeiten oder die [„Musterlösung“](https://github.com/ModProg/ExcaliburTutorial/releases/tag/1) herunterladen.

## Mausbewegung

### Grundlagen
Als Erstes lassen wir den Schriftzug „Hello World“ der Maus folgen.

Die Methode
```typescript
game.input.pointers.primary.on('move', function(evt) {

})
```
wird aufgerufen, wenn die Maus bewegt wird.
Um den Text zu bewegen, fügen wir zwischen den geschweiften Klammern:
```typescript
game.input.pointers.primary.on('move', function(evt) {
  helloWorld.pos = evt.target.lastWorldPos
})
```
Wenn wir jetzt speichern und `npm run dev` ausführen, sehen wir das der Text rechts über dem Mauszeiger angezeigt werden. Um das zu ändern, müssen wie die horizontale und vertikale Ausrichtung anpassen.

```typescript
// Vertikale Ausrichtung
helloWorld.baseAlign=ex.BaseAlign.Middle
// Horizontale Ausrichtung
helloWorld.textAlign=ex.TextAlign.Center
```

### Fadenkreuz

Es ergibt natürlich wenig Sinn, „Hello World!“ durch die Gegend zu schieben, deshalb ersetzen wir es jetzt durch das `⊕` Symbol und bringen es in die Mitte des Bildschirms, in dem wir es auf der Hälfte von Höhe und Breite platzieren:
```typescript
var helloWorld = new ex.Label('⊕',game.canvasWidth / 2, game.canvasHeight / 2);
```
Um den Mauszeiger zu verstecken, fügen wir einfach die Zeile
```typescript
game.canvas.style.cursor='none'
```
hinzu.


## Mausklick

Um den Mausklick zu registrieren, gehen wir ähnlich vor wie bei der Mausbewegung, nur tauschen wir `'move'` durch `'down'` aus:

```typescript
game.input.pointers.primary.on('down', function (evt) {

})
```

Immer dann, wenn die Maus gedrückt wird, soll eine Box erzeugt werden an der Stelle des Cursors:
```typescript
game.input.pointers.primary.on('down', function (evt) {
  game.add(new ex.Actor({
    pos: new Vector(evt.target.lastWorldPos.x,
      //-10 um die Box ein Stück hochzubewegen, damit sie besser passt
      evt.target.lastWorldPos.y - 10),
    width: 50,
    height: 50,
    color: ex.Color.White
  }))
})
```

Hier haben wir eine andere Möglichkeit genutzt die Parameter zu übergeben, anders als beim `Label` einzeln, haben sind sie in einem Object gebündelt:

```typescript
{
  pos: new Vector(evt.target.lastWorldPos.x,
    //-15 um die Box ein Stück hochzubewegen, damit sie besser passt
    evt.target.lastWorldPos.y - 15),
  width: 50,
  height: 50,
  color: ex.Color.White
}
```

Wenn wir das bei unserem Fadenkreuz ebenfalls machen, können wir so

```typescript
var helloWorld = new ex.Label('⊕', game.canvasWidth / 2, game.canvasHeight / 2);
helloWorld.fontSize = 100;
helloWorld.textAlign = ex.TextAlign.Center
helloWorld.baseAlign = ex.BaseAlign.Middle
```

zu

```typescript
var crosshair = new ex.Label({
  text:'⊕',
  pos: new Vector(game.canvasWidth / 2,
    game.canvasHeight / 2),
  fontSize:150,
  textAlign:ex.TextAlign.Center,
  baseAlign:ex.BaseAlign.Middle 
})
```

Wobei ich `helloWorld` zu `crosshair` umbenannt habe, in VSCode könnt ihr das über die Taste `F2` machen, wenn das nicht funktioniert müsst ihr händisch alle `helloWorld` zu `crosshair` ändern.

Nach dem gleichen Vorgehen, können wir auch das setzen der Hintergrundfarbe verschieben:

```typescript
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})
```

statt 
```typescript
game.backgroundColor = ex.Color.fromRGB(0, 150, 100);
```

Bisher ist ja alles in einer Datei und eher „prozedural“ im nächsten Teil wollen wir das ganze etwas übersichtlicher machen indem wir Klassen anlegen.