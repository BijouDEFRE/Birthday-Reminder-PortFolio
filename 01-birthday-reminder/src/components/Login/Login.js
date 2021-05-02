// Functionals import
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
// Import context
import { FirebaseContext } from '../Firebase';
// Esthetics import
import './login.css';

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    // on définit une condition pour l'affichage du bouton, une fois les champs renseignés
    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = event => {
        event.preventDefault();

        firebase.loginUser(email, password)
        .then(user => {
            console.log(user)
            setEmail('');
            setPassword('');
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error);
            setEmail('');
            setPassword('');
        })
    }

    return (
        
        <div className="login">

            {error !== '' && <span>{error.message}</span>}
                        
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>

                <div className="inputBox">
                    <input onChange={event => setEmail(event.target.value)} value={email} type="email" autoComplete="off" required />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="inputBox">
                    <input onChange={event => setPassword(event.target.value)} value={password} type="password" autoComplete="off" required />
                    <label htmlFor="password">Mot de passe</label>
                </div>

                { btn ? <Button>Connexion</Button> : <Button disabled>Connexion</Button> }

            </form>
            <div className="linkContainer">
                <Link className="simpleLink" to="/signup">Nouveau ? Insrivez-vous maintenant.</Link>
                <br />
                <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié ?</Link>
            </div>
        </div>
    )
}

export default Login;