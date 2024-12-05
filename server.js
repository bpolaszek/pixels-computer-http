import express from 'express';
import { getTextWidthInPixels } from './canvas.js';

const app = express();
app.use(express.json());

const measureText = (text, fontFamily, sizeInPixels) => {
    if (!text || !fontFamily || !sizeInPixels) {
        throw new Error('Missing required parameters. Please provide text, fontFamily and sizeInPixels');
    }
    return getTextWidthInPixels(text, fontFamily, parseInt(sizeInPixels));
};

app.get('/measure', (req, res) => {
    const { text, fontFamily, sizeInPixels } = req.query;
    
    try {
        const width = measureText(text, fontFamily, sizeInPixels);
        res.set('Cache-Control', 'public, max-age=300, s-maxage=87400');
        res.json({ width });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/measure', (req, res) => {
    const { text, fontFamily, sizeInPixels } = req.body;
    
    try {
        const width = measureText(text, fontFamily, sizeInPixels);
        res.json({ width });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
