import * as ex from 'excalibur';
import { Crosshair } from './ui';
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})
var crosshair = new Crosshair(150, game.canvasWidth / 2, game.canvasHeight / 2)

game.add(crosshair);
game.canvas.style.cursor = 'none'
game.input.pointers.primary.on('move', function (evt) {
  crosshair.pos = evt.target.lastWorldPos
})
game.input.pointers.primary.on('down', function (evt) {
  game.add(new ex.Actor({
    x: evt.target.lastWorldPos.x,
    //-10 um die Box ein Stück hochzubewegen, damit sie besser passt
    y: evt.target.lastWorldPos.y - 15,
    width: 50,
    height: 50,
    color: ex.Color.White
  }))
})
// Starten der Engine
game.start()