import * as ex from 'excalibur';
import { PointDisplay, MagazineDisplay } from './ui';
import { Truck, Boxchute } from './objects';
import { loader, cbs, playingField } from './util';

var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})

// Starten der Engine
function main() {
  playingField.x1 = 0;
  playingField.x2 = game.canvas.width;
  playingField.y1 = 40;
  playingField.y2 = game.canvas.height - 60;

  cbs.forEach(e => e[0](e[1]));

  var points = new PointDisplay("Punkte:", 0, 50, 10, 70)
  game.add(points)

  var magazine = new MagazineDisplay(5, 50, game.canvasWidth - 10, 70)
  // Das Magazin ist rechtsbündig
  magazine.textAlign = ex.TextAlign.Right
  game.add(magazine)

  var truck = new Truck();
  game.add(truck);

  game.canvas.style.cursor = 'url(res/crosshair.png) 64 64, auto'




  game.input.pointers.primary.on('down', function (evt) {
    game.add(new Boxchute(evt.target.lastWorldPos.x, evt.target.lastWorldPos.y))
    magazine.addShells(-1)
    if (magazine.value <= 0)
      location.reload()
  })
}
game.onPreUpdate = (engine, delta) => {
  playingField.x1 = 0;
  playingField.x2 = engine.canvas.width;
  playingField.y1 = 20;
  playingField.y2 = engine.canvas.height - 40;
}
game.start(loader).then(main)