import express from 'express';
import { getTextWidthInPixels } from './canvas.js';

const app = express();
app.use(express.json());

const ALLOWED_FONTS = ['Arial', 'Roboto'];

const validateFont = (fontFamily) => {
    if (!ALLOWED_FONTS.includes(fontFamily)) {
        throw new Error(`Invalid font family. Only ${ALLOWED_FONTS.join(' and ')} are allowed.`);
    }
};

const measureText = (text, fontFamily, fontSize) => {
    if (!text || !fontFamily || !fontSize) {
        throw new Error('Missing required parameters. Please provide text, fontFamily and fontSize');
    }
    validateFont(fontFamily);
    return getTextWidthInPixels(text, fontFamily, parseInt(fontSize));
};

app.get('/compute-pixels', (req, res) => {
    const { text, fontFamily, fontSize } = req.query;

    try {
        const pixelSize = measureText(text, fontFamily, fontSize);
        res.set('Cache-Control', 'public, max-age=300, s-maxage=87400');
        res.json({ text, fontFamily, fontSize, length: text.length, pixelSize });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/compute-pixels', (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            // Traitement des requêtes multiples
            const results = req.body.map(({ text, fontFamily, fontSize }) => {
                const pixelSize = measureText(text, fontFamily, fontSize);
                return { text, fontFamily, fontSize, length: text.length, pixelSize };
            });
            res.json(results);
        } else {
            // Traitement d'une requête simple
            const { text, fontFamily, fontSize } = req.body;
            const width = measureText(text, fontFamily, fontSize);
            res.json({ text, fontFamily, fontSize, width });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
