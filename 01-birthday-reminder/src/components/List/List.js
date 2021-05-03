/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { FirebaseContext } from '../Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from '../Logout/Logout';
import Loader from '../Loader/Loader';
import People from '../People/People';
// Datas import
import data from '../../assets/data/data.json';
import './list.css';

// create a variable for use in a new array
const List = props => {

  // Initialise userSession state
  const [userSession, setUserSession] = useState(null);

  // Firebase context
  const firebase = useContext(FirebaseContext);
  
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // To listen if there is a autenticated user
    let listener = firebase.auth.onAuthStateChanged(user => {
      // if not, redirect on '/'
      user ? setUserSession(user) : props.history.push('/')
    })
    
    //  While user is not connected ...
    if (!!userSession) { // if user different of null
      // Get id from user in firebase
      firebase.user(userSession.uid)
      .get()
      // If success push data user in state object
      .then(doc => {
        if (doc && doc.exists) {
          const myData = doc.data()
          setUserData(myData)
        }
    })
    // If error clg error
    .catch(error => {
      console.log(error);
    })
    }
    
    return () => {
      // To cleanUp. stop the listener
      listener()
    }
  }, [userSession, firebase, firebase.history, props.history])
  
  const [people, setPeople] = useState(data)

  return userSession === null ? (
    <Fragment>
      <Loader
        loadingMsg={"Authentification ..."}
        styling={{textAlign: 'center', color: '#FFFFFF'}}
      />
    </Fragment>
  ) : (
    <main>
      <section className='container'>
        <h3>{people.length} birthdays today</h3>
        <Logout userData={userData}/>
        <People people={people} />
        <button onClick={() => setPeople([])}>clear all</button>
      </section>
    </main>
  )
}

export default List;