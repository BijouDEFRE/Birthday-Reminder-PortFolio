import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
        this.storage = app.storage();
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
    // user = uid => this.db.doc(`users/${uid}`)
    user = uid => this.db.doc(`users/${uid}`);

    // Add friend
    addFriend = (firstName, lastName, birthDate, fileUrl) => {
   
        // Identification par "id" du user authentifié
        let userLogged = this.auth.currentUser.uid
        // console.log(userLogged);

        this.db.collection('users').doc(userLogged)
        .collection('friends').doc(document.id).set({ firstName, lastName, birthDate, fileUrl })
        console.log(`friend ${firstName + lastName} added`);
    }

    getAllFriends = () => {

        let userLogged = this.auth.currentUser.uid

        this.db.collection('users').doc(userLogged).collection('friends').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
            //   console.log('forEach');
            //   console.log(doc.data());
              doc.data();
            })
        })
    }

    revealFriend = (firstName, lastName, birthDate, fileUrl, friendId) => {
        console.table(`Je suis ${firstName + lastName + birthDate + fileUrl + friendId}`)
   
        // Identification par "id" du user authentifié
        let userLogged = this.auth.currentUser.uid
        // console.log(userLogged);

        this.db.collection('users').doc(userLogged)
        .collection('friends').doc(friendId).update({ firstName, lastName, birthDate, fileUrl })
        console.log(`friend ${firstName + lastName} updated`);
    }
}

export default Firebase;