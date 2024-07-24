const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const filePath = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());


app.get('/api/keys', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read file' });
        res.json(JSON.parse(data));
    });
});


app.post('/api/keys', (req, res) => {
    const newKey = req.body.key;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read file' });
        const jsonData = JSON.parse(data);
        jsonData.keys.push(newKey);
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write file' });
            res.status(201).json({ message: 'Key added' });
        });
    });
});

app.put('/api/keys/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const updatedKey = req.body.key;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read file' });
        const jsonData = JSON.parse(data);
        jsonData.keys[index] = updatedKey;
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write file' });
            res.json({ message: 'Key updated' });
        });
    });
});

app.delete('/api/keys/:index', (req, res) => {
    const index = parseInt(req.params.index);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read file' });
        const jsonData = JSON.parse(data);
        jsonData.keys.splice(index, 1);
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write file' });
            res.json({ message: 'Key deleted' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});