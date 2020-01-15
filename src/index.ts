import * as ex from 'excalibur'
import { PointDisplay, MagazineDisplay } from './ui'
import { Truck, Boxchute } from './objects'
import { playingField } from './util'
import { Loader } from './resources'


var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})

export const points = new PointDisplay("Punkte:", 0, 50, 10, 70)
// Starten der Engine
function main() {
  // Die Collision Groups:
  
  playingField.x1 = 0
  playingField.x2 = game.canvas.width
  playingField.y1 = 150
  playingField.y2 = game.canvas.height - 60
  
  // game.isDebug = true

  game.add(points)

  var magazine = new MagazineDisplay(5, 50, game.canvasWidth - 10, 70)
  // Das Magazin ist rechtsbündig
  magazine.textAlign = ex.TextAlign.Right
  game.add(magazine)

  var truck = new Truck()
  game.add(truck)

  game.canvas.style.cursor = 'url(res/crosshair.png) 64 64, auto'

  game.input.pointers.primary.on('down', function (evt) {
    let bc = new Boxchute(evt.target.lastWorldPos.x, evt.target.lastWorldPos.y)
    game.add(bc)
    magazine.addShells(-1)
    if (magazine.value <= 0)
      location.reload()
  })

}
game.start(Loader()).then(main)