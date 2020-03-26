import * as ex from 'excalibur'
import { Crosshair, MagazineDisplay, PointDisplay } from './ui'
import { Loader } from './resources'
import { Boxchute, Truck } from './objects'
import { playingField } from '../utils'
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})

function main() {


  playingField.x1 = 0
  playingField.x2 = game.canvas.width
  playingField.y1 = 150
  playingField.y2 = game.canvas.height - 60


  var truck = new Truck()
  game.add(truck)

  game.canvas.style.cursor = 'url(images/crosshair.png) 64 64, crosshair'

  game.input.pointers.primary.on('down', function (evt) {
    let bc = new Boxchute(evt.target.lastWorldPos.x, evt.target.lastWorldPos.y)
    game.add(bc)
    magazine.addShells(-1)
    if (magazine.value <= 0)
      location.reload()
  })

  var magazine = new MagazineDisplay(5, 50, game.canvasWidth - 10, 70)
  magazine.textAlign = ex.TextAlign.Right
  game.add(magazine)

  var points = new PointDisplay("Score: ", 0, 50, 10, 70)
  game.add(points)
}
// Starten der Engine
game.start(Loader()).then(main)