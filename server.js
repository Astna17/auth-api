const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(), 
  databaseURL: firebaseConfig.databaseURL,
});

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    return res.status(200).json({
      message: 'Connexion réussie',
      token: customToken,
    });
  } catch (err) {
    console.error('Erreur lors de l\'authentification :', err.message);
    return res.status(401).json({ error: err.message });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      uid: user.uid,
    });
  } catch (err) {
    console.error('Erreur lors de l\'inscription :', err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
