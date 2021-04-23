// Functionals import
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
// Esthetics import
import './forgetPassword.css';

// je renseigne le props pour pouvoir accéder aux "target"
const ForgetPassword = (props) => {

    // mise en place du context
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    /* on vérifie notre handler */
    /* console.log(email); */

    // variable d'état pour vérifier la valeur de l'email
    const [success, setSucces] = useState(null);
    // variable d'état pour afficher un message d'erreur
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        // méthode de firebase
        firebase.passwordReset(email)
        .then(() => {
            // on vide la variable dans un 1er temps
            setError(null);
            // on affiche le message d'envoie (API Firebase)
            setSucces(`Mail de réinitialisation de mot de passe effectué sur ${email}`);
            setEmail("");

            setTimeout(() => {
                // on redirige vers la route /login après 5 secondes
                props.history.push('/login')
            }, 5000)
        })
        .catch(error => {
            setError(error);
            // on vide les champs résent de le formulaire
            setEmail("");
        })
    }

    // gestion de l'affichage du bouton
    const disabled = email === "";

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {/* Gestion de l'affichage du message */}
                        { success && <span style={{
                            border: "1px solid green",
                            background: "green",
                            color: "white"
                        }}>{success}</span> }

                        { error && <span>{error.message}</span> }
                        
                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={event => setEmail(event.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword