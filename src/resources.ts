import * as ex from "excalibur"

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

export const Textures: { [key: string]: ex.Texture } = {
    Parachute: tex("parachute.png"),
    Truck: tex("truck.png"),
    Boxchute: tex("boxchute.png"),
}

export const SpriteFonts: { [key: string]: ex.SpriteFont } = {}

export function Loader() {
    let loader = new ex.Loader(Object.values(Textures))
    loader.oncomplete = () => {
        font("Parachute");
    }
    return loader;
}

export const CollisionGroups = {
    back: ex.CollisionGroupManager.create("back"),
    front: ex.CollisionGroupManager.create("front")
}