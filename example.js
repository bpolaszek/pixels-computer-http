import { getTextWidthInPixels } from './canvas.js'

// Exemple d'utilisation
const text = "Découvrez les meilleurs outils SEO pour booster votre visibilité";
const width = getTextWidthInPixels(text, 'Arial', 16);

console.log(`Largeur du texte : ${width} pixels`);