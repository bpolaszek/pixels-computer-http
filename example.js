import { getTextWidthInPixels } from './canvas.js'

// Exemple d'utilisation
const text = "Découvrez les meilleurs outils SEO pour booster votre visibilité";
let width = getTextWidthInPixels(text, 'Arial', 16);
console.log(`Largeur du texte (Arial): ${width} pixels`);
width = getTextWidthInPixels(text, 'Roboto', 16);
console.log(`Largeur du texte (Roboto): ${width} pixels`);
