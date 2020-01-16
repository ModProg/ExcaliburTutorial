# Bilder und mehr

Moin Kinn'ers, dies wird etwas länger, diesmal fügen wir einerseits Bilder hinzu, zum anderen bauen wir auch schon einen Teil der aufwändigeren Spiellogik. (Hier habe ich ca. 2 Wochen dran gesessen, weil ich den einen Fehler nicht gefunden hatte...)

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

Als erstes fügen wir oben in der Datei eine neue Konstante hinzu `const CopyWebpackPlugin = require('copy-webpack-plugin');`. Anschließend, ziemlich weit unten fügen wir im Bereich `plugins: [...]` einen neuen Eintrag `new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }]),` ein.

Die fertige Datei sollte dann in etwa so aus sehen: 
```js
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

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
  );
};
```

Anschließend installieren wir noch das `copy-webpack-plugin` über NPM mit `npm install --save-dev copy-webpack-plugin`.

### Resources
Beim Schreiben des Tutorials musste ich an dieser Stelle erstmal einiges ausprobieren, bis alles lief. Diesen Part überspringen wir mal lieber, ich denke es ist so schon lang genug.

> Wir haben jetzt noch etwa 400 Zeilen Code in diesem Tutorial vor uns (nur geschätzt, ich habe das nicht nachgezählt). Schaffen wir aber denke ich trotzdem.

Um unsere Resourcen wie Grafiken oder Schriftarten zu verwalten, erstellen wir eine Datei namens `resources.ts`. Um Excalibur zu verwenden, importieren wir dieses wieder als `ex` mit `import * as ex from "excalibur"`.

Hier schreiben wir dann zuerst zwei kleine Hilfsfunktionen zum Laden von Texturen, und zum Erzeugen von Schriftarten:
```js
function tex(path: string) {
    // Lädt eine Texture mit dem Namen `path`
    return new ex.Texture("./images/" + path)
}

function font(name: string | undefined, letters = "a",
    caseSensitive = true, columns = 1, rows = 1,
    texture: ex.Texture | undefined = undefined) {
    // Wenn texture nicht übergeben wurde, 
    // wird die Texture mit dem Namen `name` verwendet
    texture = texture || Textures[name];
    let font = new ex.SpriteFont(texture, letters,
        !caseSensitive, columns, rows, texture.width,
        texture.height)
    // Wenn ein Name übergeben wurde,
    // wird die Schriftart in SpriteFonts gespeichert
    if (name)
        SpriteFonts[name] = font;
    return font
}
```

Die Werte hinter dem `=` bei `font(...)` sind so etwas wie Default-Werte.