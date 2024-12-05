import { createCanvas, GlobalFonts } from "@napi-rs/canvas";

function registerFont(path, options) {
    GlobalFonts.registerFromPath(path, options.family);
}

registerFont("Arial.ttf", { family: "Arial" });
registerFont("Roboto-Regular.ttf", { family: "Roboto" });

export function getTextWidthInPixels(text, fontFamily, sizeInPixels) {
    const canvas = createCanvas(200, 50);
    const context = canvas.getContext("2d");
    context.font = `${sizeInPixels}px "${fontFamily}"`;
    return Math.round(context.measureText(text).width);
}
