# Bilder und mehr

Moin Kinn’ers, dies wird etwas länger, diesmal fügen wir einerseits Bilder hinzu, zum anderen bauen wir auch schon einen Teil der aufwändigeren Spiellogik. (Hier habe ich ca. 2 Wochen dran gesessen, weil ich den einen Fehler nicht gefunden hatte...)

## Bilder

Einen Teil der Grafiken habe ich mit [Krita](https://link) selber erstellt (siehe [YouTube-Video](https://www.youtube.com/watch?v=z5iDlPdYS2k)), beim Rest habe ich hier die Originale verlinkt, die angepassten Versionen findet ihr im Code-Download.
|                         Bild                         | Beschreibung                 |                                                  Original                                                  |
| :--------------------------------------------------: | ---------------------------- | :--------------------------------------------------------------------------------------------------------: |
| <img src="/src/images/boxchute.png" height="100" />  | Boxchute (etwas gedreht)     |               [FreeSVG](https://freesvg.org/color-illustration-of-landing-wooden-box-chute)                |
| <img src="/src/images/parachute.png" height="100" /> | Fallschirm für Anzeige       |            [pixabay](https://pixabay.com/de/vectors/fallschirm-lieferungen-kiste-kamm-154198/)             | ma |
| <img src="/src/images/crosshair.png" height="100" /> | Fadenkreuz (etwas angepasst) | [Needpix](https://www.needpix.com/photo/88180/crosshair-cross-wires-crossed-threads-crosslines-aim-target) |
|   <img src="/src/images/truck.png" height="100" />   | Truck (schwarz umrandet)     |            [pixabay](https://pixabay.com/de/vectors/lkw-truck-auto-fahrzeug-transport-3625572/)            |


## NPM 

Beim aufsetzen des Projekts, haben wir mit `npm install` die notwendigen Pakete heruntergeladen, inzwischen sind jedoch (zumindest bei mir) ein paar Updates aufgetaucht. Mit dem gleichen Befehl, können wir die einfach installieren. Wenn ihr als Rückmeldung etwas in der Art wie
```
found 7 vulnerabilities (3 moderate, 4 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```
erhaltet führt ihr einfach `npm audit fix` aus, und behebt so zumindest die notwendigen Updates, die automatisch ausgeführt werden können.

## Code

### Bilder

Die Bilder, die wir erstellt, oder heruntergeladen haben, packen wir in den neuen Ordner `/src/images`. Damit wir jetzt aber auf diese auch zugreifen können, müssen wir die `webpack.config.js` anpassen.

Als erstes fügen wir oben in der Datei eine neue Konstante hinzu `const CopyWebpackPlugin = require('copy-webpack-plugin')`. Anschließend, ziemlich weit unten fügen wir im Bereich `plugins: [...]` einen neuen Eintrag `new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }]),` ein.

Die fertige Datei sollte dann in etwa so aus sehen: 
```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpackMerge = require("webpack-merge")

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
    .
    .
    .
    plugins: [
      new CleanWebpackPlugin({}),
      new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }]),
      new HtmlWebPackPlugin({
        title: 'Excalibur Webpack Sample'
      })
    ]
  },
    modeConfig(mode)
  )
}
```

Anschließend installieren wir noch das `copy-webpack-plugin` über NPM mit `npm install --save-dev copy-webpack-plugin`.

### Resources
Um unsere Resourcen wie Grafiken oder Schriftarten zu verwalten, erstellen wir eine Datei namens `resources.ts`. Um Excalibur zu verwenden, importieren wir dieses wieder als `ex` mit `import * as ex from "excalibur"`.

Hier schreiben wir dann zuerst eine kleine Hilfsfunktion zum Laden von Texturen:
```js
function tex(path: string) {
  // Lädt eine Texture mit dem Namen `path`
  return new ex.Texture("./images/" + path)
}
```
Damit können wir uns dann sozusagen eine Ressourcen-Bibliothek bauen:
```js
export const Textures: { [key: string]: ex.Texture } = {}
export const SpriteFonts: { [key: string]: ex.SpriteFont } = {}
```
`[key: string]: ex.Texture` legt dabei fest, das in `Textures`, zwar beliebige Einträge existieren dürfen, aber nur solche die eine Textur sind. Analog bei `SpriteFonts`.

Mit der `tex` Funktion, können jetzt Texturen geladen werden:

```js
export const Textures: { [key: string]: ex.Texture } = {
  Parachute: tex("parachute.png"),
  Truck: tex("truck.png"),
  Boxchute: tex("boxchute.png"),
}
```
Die Funktion um Schriftarten zu erzeugen ist etwas aufwändiger, hat aber eigentlich auch nur mehr Parameter:
```js
function font(name: string | undefined, letters = "a",
  caseSensitive = true, columns = 1, rows = 1,
  texture: ex.Texture | undefined = undefined) {}
```
Die Werte hinter dem `=` bei `font(...)` sind so etwas wie Default-Werte. Das heißt, wir können diese beim Aufrufen auch weglassen. Nun müssen wir die Schriftart mit `new ex.SpriteFont` erzeugen:
```js
// Wenn texture nicht übergeben wurde, 
// wird die Texture mit dem Namen `name` verwendet
texture = texture || Textures[name]
let font = new ex.SpriteFont(texture, letters,
  !caseSensitive, columns, rows, texture.width,
  texture.height)
```
Dafür übergeben wir einfach die Parameter, wobei wir `caseSensitive` invertieren müssen, da der Parameter von `SpriteFont`, `caseInsensitive` ist.
Zur Rückgabe verwenden wir, wenn ein Name übergeben wird, unsere `SpriteFonts`-Bibliothek. Zusätzlich auch mit `return`:
```js
if (name)
  SpriteFonts[name] = font
return font
```
Jetzt brauchen wir noch eine Möglichkeit die Texturen zu laden, dafür erzeugen wir eine Funktion namens `Loader`:
```js
export function Loader() {
  // Wir übergeben dem `Loader` die Texturen,
  // `Object.values` erzeugt einen Array mit allen Werten von `Textures`
  let loader = new ex.Loader(Object.values(Textures))
  loader.oncomplete = () => {
    // Die Schriftart können wir erst erzeugen, wenn die Texturen geladen sind.
    font("Parachute")
  }
  return loader
}
```
### index.ts
Das beste System, Texturen zu laden, bringt uns natürlich wenig, wenn wir es nicht aufrufen. Dafür passen wir unsere `index.ts` an. 

Zuerst löschen wir den Code für unser Fadenkreuz:
```js
var crosshair = new Crosshair(150, game.canvasWidth / 2, game.canvasHeight / 2)
game.canvas.style.cursor = 'none'
game.input.pointers.primary.on('move', function (evt) {
  crosshair.pos = evt.target.lastWorldPos
})
```
und
```js
game.add(crosshair)
```
Und ersetzen ihn mit
```js
game.canvas.style.cursor = 'url(images/crosshair.png) 64 64, crosshair'
```
Das benutzt zwar nicht unsere `resources.ts` ist aber ein guter Test um zu überprüfen ob wir Webpack richtig konfiguriert haben.
Der Code im String ist dabei [CSS](https://developer.mozilla.org/de/docs/Web/CSS), mit ihm geben wir optionen für das aussehen des Cursers an. 
[Standard Optionen](https://developer.mozilla.org/de/docs/Web/CSS/cursor) sind da z.B. `wait` oder `move`, aber man kann mit `url(image_path)` auch ein eigenes Bild festlegen die Limitierungen stehen auf [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Basic_User_Interface/Using_URL_values_for_the_cursor_property), wobei 64 die Breite und Höhe ist. 
Mit `crosshair` legen wir fest, was passieren soll, wenn aus irgendeinem Grund unser Bild nicht genutzt werden kann.

Um jetzt z.B. unsere Schriftart benutzen zu können, müssen wir sicherstellen, das zuerst die Bilder geladen sind. Dafür packen wir alles in unserer `index.ts` außer der letzten Zeile:
```js
// Starten der Engine
game.start()
```
und dem Anfang:
```js
import * as ex from 'excalibur'
import { Crosshair, MagazineDisplay, PointDisplay } from './ui'
import { Enemy } from './enemy'
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode: ex.DisplayMode.FullScreen,
  backgroundColor: ex.Color.fromRGB(10, 100, 50)
})
```
in eine neue Funktion, `main`:

```js

function main() {
  game.canvas.style.cursor = 'url(images/crosshair.png) 64 64, crosshair'
  .
  .
  .
  var enemy2 = new Enemy(game.canvasWidth / 2 + 100, game.canvasHeight / 2)
  game.add(enemy2)
  enemy2.on("pointerdown", evt => {
    points.addPoints(5)
    enemy2.kill()
  })
}
```
Anschließend, können wir unseren `game.start()` Aufruf in der letzten Zeile ändern zu:
```js
// importieren von Loader mit 
// import { Loader } from './resources'
// nicht vergessen.
game.start(Loader()).then(main)
```
Wodurch beim Starten des Spieles `Loader` aus der `resources.ts` ausgeführt wird, und anschließend (`then`) unsere `main`-Funktion. 

Jetzt können wir endlich auch unser `Textures` und `SpriteFonts` verwenden.

Dafür ändern wir bei unsrem `MagazineDisplay` `"💣"` zu `"a"` und fügen im `constructor` die Zeile `this.spriteFont = SpriteFonts.Parachute` hinzu, sodass wir:

```ts
export class MagazineDisplay extends ex.Label {
    value = 0

    constructor(startingValue: number, size: number, x: number, y: number) {
        super({
            text: "a".repeat(startingValue),
            pos: new ex.Vector(x, y),
            fontSize: size
        })
        this.value = startingValue
        this.spriteFont = SpriteFonts.Parachute
    }

    public addShells(shells: number) {
        this.value += shells
        this.text = "a".repeat(this.value)
    }
}
```
bekommen, anschließend müssen wir nur noch die `import`s hinzufügen und unser Spiel hat die ersten Texturen.