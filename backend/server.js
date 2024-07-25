const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5001
const filePath = path.join(__dirname, 'data.json');
const frontendPath = path.join(__dirname, '../frontend/build');

app.use(cors());
app.use(bodyParser.json());

// Ensure data.json file exists and has valid JSON structure
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

// API routes
app.get('/api/keys', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            return res.status(500).json({ error: 'Failed to read file' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json({ entries: jsonData });
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            res.status(500).json({ error: 'Failed to parse JSON' });
        }
    });
});

app.post('/api/keys', (req, res) => {
    const newEntry = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            return res.status(500).json({ error: 'Failed to read file' });
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.push(newEntry);
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Failed to write file:', err);
                    return res.status(500).json({ error: 'Failed to write file' });
                }
                res.status(201).json({ message: 'Entry added' });
            });
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            res.status(500).json({ error: 'Failed to parse JSON' });
        }
    });
});

app.put('/api/keys/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const updatedEntry = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            return res.status(500).json({ error: 'Failed to read file' });
        }
        try {
            const jsonData = JSON.parse(data);
            if (index >= 0 && index < jsonData.length) {
                jsonData[index] = updatedEntry;
                fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        console.error('Failed to write file:', err);
                        return res.status(500).json({ error: 'Failed to write file' });
                    }
                    res.json({ message: 'Entry updated' });
                });
            } else {
                res.status(404).json({ error: 'Entry not found' });
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            res.status(500).json({ error: 'Failed to parse JSON' });
        }
    });
});

app.delete('/api/keys/:index', (req, res) => {
    const index = parseInt(req.params.index);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            return res.status(500).json({ error: 'Failed to read file' });
        }
        try {
            const jsonData = JSON.parse(data);
            if (index >= 0 && index < jsonData.length) {
                jsonData.splice(index, 1);
                fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        console.error('Failed to write file:', err);
                        return res.status(500).json({ error: 'Failed to write file' });
                    }
                    res.json({ message: 'Entry deleted' });
                });
            } else {
                res.status(404).json({ error: 'Entry not found' });
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            res.status(500).json({ error: 'Failed to parse JSON' });
        }
    });
});

// Serve static files from the React app
app.use(express.static(frontendPath));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});