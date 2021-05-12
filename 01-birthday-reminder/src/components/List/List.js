/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { FirebaseContext } from '../Firebase';
import app from 'firebase/app'
import 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css';
import Logout from '../Logout/Logout';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Create from '../Create/Create';
import Update from '../Update/Update';
import Modal from '../Modal/Modal';
import UploadFriendModal from '../Modal/UploadFriendModal';

import { RiPencilLine } from 'react-icons/ri'
import { RiDeleteBin2Line } from 'react-icons/ri'
import './list.css';

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
  const [friendData, setFriendData] = useState({})

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
   const openModal = () => {
    // console.log('show');
    setShowModal(true)
    // console.log(showModal);
  }

  // To close Modal
  const closeModal = () => {
    // console.log('show');
    setShowModal(false)
    // console.log(showModal);
  }

   // To open UploadModal
   const openUploadModal = (friend) => {

    setFriendData({
      id: friend.id,
      birthDate: friend.birthDate,
      fileUrl: friend.fileUrl,
      firstName: friend.firstName,
      lastName: friend.lastName
    })
    setShowUpdateModal(true)
    setTimeout(function() {
      // console.log(friendData);
    }, 2000)
  }

  // To close UploadModal
  const closeUploadModal = () => {
    setShowUpdateModal(false)
  }

  if (showModal) {
    return (
      <Modal showModal={showModal} >
        <div className="container">
          <p className="close" onClick={closeModal}>Fermer la fenêtre</p>
        <Create closeModal={closeModal}/>
        </div>
      </Modal>
    )
  } else if (showUpdateModal) {
    return (
      <UploadFriendModal showUpdateModal={showUpdateModal} friendData={friendData}>
        <div className="container">
          <p className="close" onClick={closeUploadModal}>Fermer la fenêtre</p>
          <h3 className="modalTitle">{`Modification les informations de ${friendData.firstName}`}</h3>
          <Update friendData={friendData} closeModal={closeModal}/>
        </div>
      </UploadFriendModal>
    )
  } else {
    return (
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
                  <button onClick={() => openUploadModal(friend)}><RiPencilLine/></button>
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
}

export default List;