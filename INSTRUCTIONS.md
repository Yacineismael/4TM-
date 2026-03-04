# Comment rendre ton formulaire public avec GitHub Pages

## Étape 1: Créer un compte Formspree

1. Va sur https://formspree.io/
2. Clique "Start for Free" et inscris-toi (gratuit)
3. Clique "New Form" et donne un nom à ton formulaire (ex: "4TheMuslim")
4. Copie l'URL de ton formulaire - elle ressemble à:
   `https://formspree.io/f/xxxxxxxx`
5. Le code à la fin (les caractères après /f/) est ton **FORM ID**

## Étape 2: Modifier le fichier script.js

Ouvre le fichier `script.js` et remplace:
```
https://formspree.io/f/YOUR_FORM_ID
```
par ton vrai ID Formspree, par exemple:
```
https://formspree.io/f/xyab1234
```

## Étape 3: Créer un repository GitHub

1. Va sur https://github.com/
2. Clique "New repository"
3. Nom du repository: `4themuslim-form` (ou ce que tu veux)
4. Coche "Public"
5. Clique "Create repository"

## Étape 4: Uploader les fichiers

Clique sur "uploading an existing file" puis drag & drop ces fichiers:
- index.html
- style.css
- script.js
- logo.svg

Clique "Commit changes"

## Étape 5: Activer GitHub Pages

1. Dans ton repository, va dans "Settings"
2. Clique sur "Pages" dans le menu de gauche
3. Sous "Build and deployment" > "Branch":
   - Sélectionne "main" (ou "master")
   - Clique "Save"
4. Attends 1-2 minutes, puis refresh la page
5. Tu verras une URL comme: `https://tonnom.github.io/4themuslim-form/`

## Étape 6: Tester ton formulaire

1. Ouvre l'URL GitHub Pages
2. Remplis le formulaire
3. Vérifie dans ton dashboard Formspree que les réponses arrivent

---

## Pour voir les réponses

1. Va sur https://formspree.io/
2. Clique sur ton formulaire
3. Tu verras toutes les réponses dans l'onglet "Submissions"

---

## Notes importantes

- Le service gratuit de Formspree permet jusqu'à 50 soumissions par mois
- Ton formulaire est maintenant accessible partout dans le monde
- Tu peux partager l'URL avec qui tu veux
