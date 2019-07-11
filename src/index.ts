import * as ex from 'excalibur';
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen
})

game.backgroundColor = ex.Color.fromRGB(0,150,100);
var helloWorld = new ex.Label("Hello World",200,200);
game.add(helloWorld);
helloWorld.fontSize = 100;
// Starten der Engine 
game.start()