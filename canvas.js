const { createCanvas } = require("@napi-rs/canvas");

function getTextWidthInPixels(text, fontFamily, fontSize) {
    const canvas = createCanvas(200, 50);
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px ${fontFamily}`;
    return Math.round(context.measureText(text).width);
}

module.exports = { getTextWidthInPixels };
