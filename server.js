var email = document.getElementById("email");
var password = document.getElementById("password");
var signUpButton = document.getElementById("signUpButton");

signInButton.addEventListener("click", function() {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function() {
      window.location.href = "/protected-resources.html";
    })
    .catch(function(error) {
      alert(error.message);
    });
});

signUpButton.addEventListener("click", function() {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function() {
      window.location.href = "/protected-resources.html";
    })
    .catch(function(error) {
      alert(error.message);
    });
});

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

firebase.initializeApp(firebaseConfig);