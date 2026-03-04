const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
const dataFile = 'responses.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Sert les fichiers statiques

// Charge ou crée fichier JSON
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]');
}

// Soumission formulaire
app.post('/submit', (req, res) => {
    const responses = JSON.parse(fs.readFileSync(dataFile));
    responses.push(req.body);
    fs.writeFileSync(dataFile, JSON.stringify(responses, null, 2));
    res.json({ success: true });
});

// Dashboard avec graphiques (ouvre http://localhost:3000/dashboard.html)
app.get('/responses', (req, res) => {
    const responses = JSON.parse(fs.readFileSync(dataFile));
    res.json(responses);
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});