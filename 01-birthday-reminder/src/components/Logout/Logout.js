/* eslint-disable no-unused-expressions */
// Functionals import
import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
// Import tools
import ReactTooltip from 'react-tooltip';
// Esthetics import
import './logout.css'

const Logout = (props) => {

    // mise en place du context
    const firebase = useContext(FirebaseContext);

    // création de la variable d'état
    const [checked, setChecked] = useState(false);

    /*vérification si l'utilisateur est connecté
    grace au usEffect on peut changer le state*/
    useEffect(() => {
        if (checked) {
            console.log("Déconnexion");
            // on charge la fonction du composant issu de la class firebase
            firebase.signoutUser();
        }
        // ici on place les dépendances
    }, [checked, firebase]);

    const handleChange = event => {
        setChecked(event.target.checked)
    }

    return (
        <div className="logoutContainer">
            <p>List of birthday reminder of {props.userData.pseudo}</p>
            {/* création du switch */}
            <label className="switch">
                <input
                    // appel de la variable d'état
                    onChange={handleChange}
                    type="checkbox"
                    // appel de la variable d'état
                    checked={checked}
                />
                <span className="slider round" data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip
            place="left"
            effect="solid"
            />
        </div>
    )
}

export default Logout;