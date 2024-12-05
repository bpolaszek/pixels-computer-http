const express = require('express');
const serverless = require('serverless-http');
const { getTextWidthInPixels } = require('../../canvas.js');

const app = express();
app.use(express.json());

const measureText = (text, fontFamily, fontSize) => {
    if (!text || !fontFamily || !fontSize) {
        throw new Error('Missing required parameters. Please provide text, fontFamily and fontSize');
    }
    return getTextWidthInPixels(text, fontFamily, parseInt(fontSize));
};

app.get('/.netlify/functions/compute-pixels', (req, res) => {
    const { text, fontFamily, fontSize } = req.query;

    try {
        const width = measureText(text, fontFamily, fontSize);
        res.set('Cache-Control', 'public, max-age=300, s-maxage=87400');
        res.json({ text, fontFamily, fontSize, width });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/.netlify/functions/compute-pixels', (req, res) => {
    const { text, fontFamily, fontSize } = req.body;

    try {
        const width = measureText(text, fontFamily, fontSize);
        res.json({ text, fontFamily, fontSize, width });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports.handler = serverless(app);
