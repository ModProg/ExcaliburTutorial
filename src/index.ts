import * as ex from 'excalibur';
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})
var crosshair = new ex.Label({
  text: '⊕',
  x: game.canvasWidth / 2,
  y: game.canvasHeight / 2,
  fontSize: 150,
  textAlign: ex.TextAlign.Center,
  baseAlign: ex.BaseAlign.Middle
})

game.add(crosshair);
game.canvas.style.cursor = 'none'
game.input.pointers.primary.on('move', function (evt) {
  crosshair.pos = evt.target.lastWorldPos
})
game.input.pointers.primary.on('down', function (evt) {
  game.add(new ex.Actor({
    pos: new ex.Vector(evt.target.lastWorldPos.x,
      //-15 um die Box ein Stück hochzubewegen, damit sie besser passt
      evt.target.lastWorldPos.y - 15),
    width: 50,
    height: 50,
    color: ex.Color.White
  }))
})
// Starten der Engine
game.start()