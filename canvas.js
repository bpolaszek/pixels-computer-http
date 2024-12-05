import { createCanvas } from "canvas";

export function getTextWidthInPixels(text, fontFamily, sizeInPixels) {
    const canvas = createCanvas(200, 50);
    const context = canvas.getContext("2d");
    context.font = `${sizeInPixels}px "${fontFamily}"`;
    return Math.round(context.measureText(text).width);
}