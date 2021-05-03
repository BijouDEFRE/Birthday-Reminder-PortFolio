import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        // Firestore Cloud gestionnaire noSQL fourni par Firebase
        this.db = app.firestore();
    }

    // Insriptions
    signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    // Connexions
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    //Déconnexions
    signoutUser = () => this.auth.signOut();

    // Récupération du mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    /*Exemple fourni par la Doc de Firebase :
    https://firebase.google.com/docs/firestore/data-model */
    user = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;