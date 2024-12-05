const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Gérer la route racine de la fonction serverless
app.get('/.netlify/functions/server', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

// Gérer la route racine du site
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

// Exporter le handler pour Netlify Functions
module.exports.handler = serverless(app);
