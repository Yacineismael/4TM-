const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const DATA_FILE = path.join(__dirname, 'submissions.json');

// Configuration Gmail - UTILISEZ UN APP PASSWORD
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yacineismaelkante@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fonction pour charger les donnees
function loadSubmissions() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Erreur lecture:', err);
    }
    return [];
}

// Fonction pour sauvegarder les donnees
function saveSubmission(data) {
    const submissions = loadSubmissions();
    submissions.push({
        ...data,
        timestamp: new Date().toISOString()
    });
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    return submissions.length;
}

// Route pour recevoir les donnees du formulaire
app.post('/api/submit', async (req, res) => {
    const formData = req.body;
    
    try {
        const count = saveSubmission(formData);
        
        // Envoyer un email de notification
        let emailContent = 'Nouvelle reponse au formulaire 4 The Muslim:\n\n';
        for (const [key, value] of Object.entries(formData)) {
            if (Array.isArray(value)) {
                emailContent += key + ': ' + value.join(', ') + '\n';
            } else {
                emailContent += key + ': ' + value + '\n';
            }
        }
        
        const mailOptions = {
            from: 'yacineismaelkante@gmail.com',
            to: 'yacineismaelkante@gmail.com',
            subject: 'Nouvelle reponse - 4 The Muslim',
            text: emailContent
        };
        
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email envoye!');
        } catch (emailErr) {
            console.log('Email non envoye:', emailErr.message);
        }
        
        res.json({ success: true, message: 'Reponses enregistrees!', total: count });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement' });
    }
});

// Route pour voir toutes les soumissions
app.get('/api/submissions', (req, res) => {
    const submissions = loadSubmissions();
    res.json(submissions);
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Page d'admin
app.get('/admin', (req, res) => {
    const submissions = loadSubmissions();
    let html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Admin - Reponses formulaire</title><style>body{font-family:Arial,sans-serif;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background-color:#4CAF50;color:white}tr:nth-child(even){background-color:#f2f2f2}.count{font-size:24px;margin-bottom:20px}</style></head><body><h1>Reponses au formulaire 4 The Muslim</h1><p class="count">Total: ' + submissions.length + ' reponses</p><table><tr><th>Date</th><th>Age</th><th>Genre</th><th>Pays</th><th>Priere</th><th>Tracking</th><th>Paiement</th></tr>';
    
    submissions.forEach(function(sub) {
        html += '<tr><td>' + (sub.timestamp ? sub.timestamp.substring(0, 10) : '-') + '</td><td>' + (sub.age || '-') + '</td><td>' + (sub.genre || '-') + '</td><td>' + (sub.pays || '-') + '</td><td>' + (sub.niveau_pratique || '-') + '</td><td>' + (sub.tracking || '-') + '</td><td>' + (sub.paiement || '-') + '</td></tr>';
    });
    
    html += '</table><h2>Toutes les donnees (JSON)</h2><pre>' + JSON.stringify(submissions, null, 2) + '</pre></body></html>';
    res.send(html);
});

// Demarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Serveur demarre!');
    console.log('Formulaire: http://localhost:' + PORT + '/');
    console.log('Admin: http://localhost:' + PORT + '/admin');
});
