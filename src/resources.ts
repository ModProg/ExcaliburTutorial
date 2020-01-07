import * as ex from "excalibur"
import { SpriteFont, Texture } from "excalibur"

function tex(path: string) {
    return new ex.Texture("./images/" + path)
}

function font(name: string | undefined, letters = "a", caseSensitive = true, columns = 1, rows = 1, texture: ex.Texture | undefined = undefined) {
    texture = texture || Textures[name];
    let font = new SpriteFont(texture, letters,
        !caseSensitive, columns, rows, texture.width,
        texture.height)
    if (name)
        SpriteFonts[name] = font;
    return font
}

export const Textures: { [key: string]: Texture } = {
    Parachute: tex("parachute.png"),
    Truck: tex("truck.png"),
    Boxchute: tex("boxchute.png"),

}

export const SpriteFonts: { [key: string]: ex.SpriteFont } = { } 

export function Loader() {
    let loader = new ex.Loader(Object.values(Textures))
    loader.oncomplete = () => {
        font("Parachute");
    }
    return loader;
}
