import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './signup.css'

const Signup = (props) => {

    const firebase = useContext(FirebaseContext);
    // console.log(firebase);

    const data = {
        pseudo:'',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setloginData] = useState(data);
    const [error, setError] = useState('');

    const handleChange = event => {
        setloginData({...loginData, [event.target.id]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { email, password, pseudo } = loginData;
        // création de la BDD avec Firestore cloud (noSQL)
        firebase.signupUser(email, password)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(() => {
            setloginData({...data});
            props.history.push('/list')
        })
        .catch(error => {
            setError(error);
            setloginData({...data})
        })
    }

    const { pseudo, email, password, confirmPassword } = loginData;

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <Button disabled>Inscription</Button> : <Button>Inscription</Button>

    // gestion des erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slsignup">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="signup">
                        
                        {errorMsg}

                    <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>

                            {btn}           
                        </form>
                        <div className="linksignup">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;