# Einrichten

Moin Kinner’s, wir nutzen jetzt [Excalibur](https://excaliburjs.com/) mir TypeScript und WebPack.

## Downloads

Ladet das Projekt von GitHub herrunter: https://github.com/ModProg/ExcaliburTutorial/releases/tag/0

Für dieses Projekt braucht ihr NodeJS und NPM, wenn ihr dies noch nicht installiert habt, könnt ihr der Anleitung auf der [Website](https://nodejs.org/de/) von NodeJS folgen.

### Windows 

Ladet einfach einen der Installer auf der NodeJS Website herrunter und installiert ihn. Dabei könnt ihr alle Einstellungen so lassen, wie sie sind.

### Linux

NodeJS sollte in den offiziellen Paketquellen vorhanden sein, sich also mit `sudo apt install nodejs npm` unter [Debian/Ubuntu](https://wiki.ubuntuusers.de/Node.js/) und mit `sudo pacman -S nodejs npm` unter [Arch/Manjaro](https://wiki.archlinux.org/index.php/Node.js)

### Editor
Als Editor benutze ich VSCode, ihr könnt aber auch jeden anderen Texteditor benutzen, VSCode könnt ihr hier herrunterladen:

https://code.visualstudio.com/download

Hilfe findet ihr für [Debian/Ubuntu](https://wiki.ubuntuusers.de/Visual_Studio_Code/) und [Arch/Manjaro](https://wiki.archlinux.org/index.php/Visual_Studio_Code)

## Projekt öffnen

Nachdem ihr alles herruntergeladen und installiert habt, öffnet den Ordner, in den ihr das Projekt extrahiert/herruntergeladen habt, und öffnet dort das Terminal/CMD/Powershell

### Windows

Entweder `⇧ + Rechte Maustaste` im Dateiexplorer oder ihr gebt `cmd` im Start Menü ein und wechselt dann mit `cd "c:/path/to/folder"` zu dem Ordner, in dem ihr das Projekt habt. 

> Wenn der Ordner auf einer anderen Partition liegt, wechselt einfach mit `d:`, `e:`, etc.

### Linux

Wenn euer Dateiexplorer im Kontextmenü einen Eintrag `Terminal` hat, könnt ihr direkt das Terminal im richtigen Ordner öffnen, alternativ könnt ihr z. B. mit `Strg+Alt+T` das Terminal öffnen und manuel mit `cd "path/to/folder"` zum Projekt navigieren.

Im geöffneten Terminal könnt ihr jetzt `npm install` zum Installieren der nötigen Abhängigkeiten ausführen und anschließend `npm run dev` zum Starten der Anwendung. 

> Wenn es zu Fehlern kommt überprüft noch mal, ob ihr euch auch in dem richtigen Ordner befindet.

Im Idealfall öffnet sich jetzt euer Standard Browser und ihr seht einen blauen Hintergrund, wenn nicht, öffnet `http://localhost:8080/` in einem Browser eurer Wahl.

# Der erste Code

Aller relevante Programmcode liegt zurzeit in einer Datei: `src/index.ts` dies ist sozusagen die Wurzel eures Spiels. 

Die erste Zeile lädt das Modul `excalibur` und stellt es als `ex` zur Verfügung.

```typescript
import * as ex from 'excalibur';
```

Anschließend nutzen wir `ex`, um unsere Spielinstanz zu generieren, was es sich damit auf sich hat, werden wir später noch sehen.

```typescript
var game = new ex.Engine({
  // Stellt den Darstellungsmodus auf Fullscreen
  displayMode:ex.DisplayMode.FullScreen
})
```

Die letzte Zeile startet dann das Spiel

```typescript
game.start()
```

## Erste eigene Zeile Code

Um beispielsweise die Hintergrundfarbe zu ändern, können wir einfach die Zeile

```typescript
game.backgroundColor = ex.Color.Red;
```

vor `game.start()` hinzufügen.

Bei der Verwendung eines Editors wie VSCode kann man oft vervollständigungen Anzeigen, in dem man z. B. `Strg + Leertaste` drückt. Wenn wir `Red` entfernen und dann hinter dem Punkt die Vorschläge mit `Strg + Leertaste` anzeigen, sehen wir auf einen Blick alle möglichen Farben, ohne jedes Mal in der Dokumentation nachschauen zu müssen, wenn wir so `Red` ersetzen könnten wir auch eigene Farben erzeugen mit

```typescript
game.backgroundColor = ex.Color.fromRGB(0,150,100);
```

Wobei 0, 150 und 100 für wie rot, grün und blau die Farbe ist stehen, und dabei Werte von 0 bis 255 annehmen können.

## Hello World

Nun wollen wir der Welt mitteilen, dass wir Excalibur bedienen können. Dafür fügen wir unser erstes Object, einen `Actor` in unser Spiel hinzu.

Vor `game.start()` fügen wir 
```typescript
var helloWorld=new ex.Label("Hello World!",200,200);
```
hinzu. Damit haben wir schonmal Text. Mit

```typescript
game.add(helloWorld);
```

packen wir den jetzt auch ins Spiel, nur ist er noch recht klein. Die Größe kann dann mit

```typescript
helloWorld.fontsize=100;
```

angepasst werden.
