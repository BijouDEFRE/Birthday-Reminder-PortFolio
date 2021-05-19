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
import UpdateModal from '../Modal/UpdateModal';

// Import tools
import ReactTooltip from 'react-tooltip';
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
  }, [userAuth])

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
   const openUpdateModal = (friend) => {

    setFriendData({
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      birthDate: friend.birthDate,
      profilImage: friend.profilImage,
      fileUrl: friend.fileUrl,
    })
    setShowUpdateModal(true)
    setTimeout(function() {
      // console.log(friendData);
    }, 2000)
  }

  // To close UploadModal
  const closeUpdateModal = () => {
    setShowUpdateModal(false)
  }

  // To use singular or plurial

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
      <UpdateModal showUpdateModal={showUpdateModal} friendData={friendData}>
        <div className="container">
          <p className="close" onClick={closeUpdateModal}>Fermer la fenêtre</p>
          <h3 className="modalTitle">{`Informations sur ${friendData.firstName} ${friendData.lastName}`}</h3>
          <Update friendData={friendData} closeModal={closeUpdateModal}/>
        </div>
      </UpdateModal>
    )
  } else {
    return (
      <Fragment>
        <div className="container">
        <Logout userData={userData} />

        <h3>{friends.length === 1 ? `Vous avez ${friends.length} ami enregistré` : `Vous avez ${friends.length} amis enregistrés` }</h3>
        {/* <h3>{`Vous avez ${friends.length} amis enregistrés`}</h3> */}
        
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
                  <button data-tip data-for="Modifier"
                  onClick={() => openUpdateModal(friend)}>
                    <RiPencilLine/>
                    </button>
                  <ReactTooltip id="Modifier" place="left" type="success" effect="solid">Modifier</ReactTooltip>

                  <button data-tip data-for="Supprimer"
                  onClick={() => { if (window.confirm('Cette action est définitive !!!')) deleteFriend(friend)}}>
                    <RiDeleteBin2Line/>
                    </button>
                  <ReactTooltip id="Supprimer" place="right" type="error" effect="solid">Supprimer</ReactTooltip>
                </div>
              </article>
            );
          })}
            <Button className="btn" type="button" onClick={openModal}>
                Ajouter un anniversaire
            </Button>
        </div>
      </Fragment>
    )
  }
}

export default List;