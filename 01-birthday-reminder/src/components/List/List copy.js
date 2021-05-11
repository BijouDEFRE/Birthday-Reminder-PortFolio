/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { FirebaseContext } from '../Firebase';
import app from 'firebase/app'
import 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css';
import Logout from '../Logout/Logout';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
// import Friends from '../Friends/Friends';
import Create from '../Create/Create';
import Modal from '../Modal/Modal';
import { RiPencilLine } from 'react-icons/ri'
import { RiDeleteBin2Line } from 'react-icons/ri'
import './list.css';
import { queryByDisplayValue } from '@testing-library/dom';

// create a variable for use in a new array
const List = props => {

  // Firebase context
  const firebase = useContext(FirebaseContext);
  // Get user from firebase
  const userAuth = firebase.auth.X

  // Initialise userSession state
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    // To get friends for users account
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends')
    .onSnapshot((snapshot) => {
      const newFriends = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setFriends(newFriends)
    })
  }, [])

  // To delete Friends
  function deleteFriend(friend) {
    // console.log(friend.id)
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends').doc(friend.id).delete()
  }
  // To update Friends
  function updateFriend(friend) {
    console.log(friend.id)
    openModal()
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends').doc(friend.id).set({})
  }
  
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

   // To open Modal
   const openModal = event => {
    // console.log('show');
    setShowModal(prevent => !prevent)
    // console.log(showModal);
  }

  // To close Modal
  const closeModal = event => {
    // console.log('show');
    setShowModal(prevent => !prevent)
    // console.log(showModal);
  }

   // To open UploadModal
   const openUploadModal = () => {
    setShowUpdateModal((prev) => !prev)
  }

  // To close UploadModal
  const closeUploadModal = () => {
    setShowUpdateModal((prev) => !prev)
  }

  return showModal === true ? (
    <Modal showModal={showModal} >
      <div className="container">
        <p className="close" onClick={closeModal}>Fermer la fenêtre</p>
      <Create closeModal={closeModal}/>
      </div>
    </Modal>
  ) : (
    <Fragment>
    <div className="container">
    <Logout userData={userData} />
    <h3>{`Vous avez ${friends.length} amis enregistrés`}</h3>
      {friends.map((friend) => {
        const { id, firstName, lastName, birthDate, fileUrl } = friend;
        return (
          <article key={id} className='person'>
            <div className="person__avatar">
              <img src={fileUrl} alt={firstName} />
            </div>
            <div className="person__infos">
              <h4>{firstName + ' ' +lastName}</h4>
              <p>{birthDate}</p>
            </div>
            <div className="person__icons">
              <button onClick={(friend) => updateFriend(friend)}><RiPencilLine/></button>
              <button onClick={() => deleteFriend(friend)}><RiDeleteBin2Line/></button>
            </div>
          </article>
        );
      })}
        <Button className="btn" type="button" onClick={openModal}>
            Ajouter un Anniversaire
        </Button>
    </div>
    </Fragment>
  )
}

export default List;