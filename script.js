// URL du backend Render
const API_URL = 'https://fourtm-questionnaire.onrender.com/api/submit';

document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) data[key] = [data[key]];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Merci ! Vos réponses ont été enregistrées.');
            document.getElementById('surveyForm').reset();
        } else {
            alert('Erreur : ' + result.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de connexion. Veuillez réessayer.');
    });
});

