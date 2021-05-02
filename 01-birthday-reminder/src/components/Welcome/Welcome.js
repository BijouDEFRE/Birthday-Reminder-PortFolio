import React, { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import Logout from '../Logout/Logout';
import List from '../List/List';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

import '../Welcome/welcome.css'

// on passe le "props" pour accéder à history et push
const Welcome = props => {

    // chargement du useContext de firebase
    const firebase = useContext(FirebaseContext);
    // par défaut on met le state à null
    const [userSession, setUserSession] = useState(null);
    /* on créer une variable pour récupérer les infos de user,
    afin de pouvoir les faire passer aux composants que l'on souhaite
    par défaut, au chargement on à rien ({}) */
    const [userData, setUserData] = useState({});
    
    // cette callback function ne s'enclanche qu'une fois
    useEffect(() => {
        // methode "listener" fournie par Firebase qui permet de détecter un user identifier
        let listener = firebase.auth.onAuthStateChanged(user => {
            // condition : pas de user identifié, je redirige vers la page /
            user ? setUserSession(user) : props.history.push('/')
        });

        // si on est différent de null (!!) on à acces à "user"
        if (!!userSession) {
            firebase.user(userSession.uid)
            .get()
            .then( doc => {
                if (doc && doc.exists) {
                    const myData = doc.data();
                    setUserData(myData)
                }
            })
            .catch( error => {
                console.log(error);
            })
        };

        return () => {
            // on arrête le composant
            listener()
        }
        // si il y à un changement au niveau de "userSession", on relance la la fonction
    }, [userSession, firebase, props.history])

    return userSession === null ? (
        <Loader
            loadingMsg={"Authentification..."}
            styling={{textAlign: 'center', color: '#FFFFFF'}}
        />
    ) : (
        // si le user existe, on renvoie vers la page List
        <main>
            <div className="container">
                <Logout/>
                <List userData={userData}/>
                {/* here we recup the new state for iterate new array */}
                <Button>
                  clear all
                </Button>
            </div>
          </main>
    )
}

export default Welcome;