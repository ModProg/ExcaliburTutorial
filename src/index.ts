import * as ex from 'excalibur';
import { Crosshair, PointDisplay, MagazineDisplay } from './ui';
import { Enemy } from './enemy';
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

var points = new PointDisplay("Punkte:", 0, 50, 10, 70)
game.add(points)

var magazine = new MagazineDisplay(5, 50, game.canvasWidth - 10, 70)
// Das Magazin ist rechtsbündig
magazine.textAlign = ex.TextAlign.Right
game.add(magazine)

var enemy = new Enemy(game.canvasWidth / 2, game.canvasHeight / 2)
game.add(enemy)

enemy.on("pointerdown", evt => {
  points.addPoints(5)
  // Entfernt den Gegner
  enemy.kill()
})

var enemy2 = new Enemy(game.canvasWidth / 2 + 100, game.canvasHeight / 2)
game.add(enemy2)

enemy2.on("pointerdown", evt => {
  points.addPoints(5)
  // Entfernt den Gegner
  enemy2.kill()
})



game.input.pointers.primary.on('down', function (evt) {
  magazine.addShells(-1)
  if (magazine.value <= 0)
    location.reload()
})
// Starten der Engine
game.start()