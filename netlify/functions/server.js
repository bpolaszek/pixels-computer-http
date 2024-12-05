const express = require('express');
const serverless = require('serverless-http');
const {getTextWidthInPixels} = require("../../canvas")

const app = express();
app.use(express.json());

const measureText = (text, fontFamily, sizeInPixels) => {
  if (!text || !fontFamily || !sizeInPixels) {
    throw new Error('Missing required parameters. Please provide text, fontFamily and sizeInPixels');
  }
  return getTextWidthInPixels(text, fontFamily, parseInt(sizeInPixels));
};

// Gérer la route racine de la fonction serverless
app.get('/.netlify/functions/server', (req, res) => {
  //res.status(200).json({ message: 'Hello world from /.netlify/functions/server' });
  const { text, fontFamily, sizeInPixels } = req.query;

  try {
    const width = measureText(text, fontFamily, sizeInPixels);
    res.set('Cache-Control', 'public, max-age=300, s-maxage=87400');
    res.json({ width });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Gérer la route racine du site
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

// Exporter le handler pour Netlify Functions
module.exports.handler = serverless(app);
