import React, { Fragment, useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from '../Button';
import Logout from '../Logout';
import Create from '../Create';
import Update from '../Update';
import Modal from '../Modal';
import UploadFriendModal from '../UploadFriendModal';

import { RiPencilLine } from 'react-icons/ri';
import { RiDeleteBin2Line } from 'react-icons/ri';
import './style.css';

const List = props => {

  const firebase = useContext(FirebaseContext)
  // Get user from firebase
  const userAuth = firebase.auth.X

  // State definition
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})
  const [friends, setFriends] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [friendData, setFriendData] = useState({})

  // To get friends from firebase acount
  useEffect(() => {
    app
     .firestore()
     .collection('users')
     .doc(userAuth)
     .collection("friends")
     .onSnapshot((snapshot) => {
       const newFriends = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data()
       }))

       setFriends(newFriends)
     })
  },[userAuth])

  // To delete Friends
  function deleteFriend(friend) {
    
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends').doc(friend.id).delete()
  }

  // To look if user is connected
  useEffect(() => {

    let listener = firebase.auth.onAuthStateChanged(user => {
       user ? setUserSession(user) : props.history.push('/')
    })
    if(!!userSession) {
      firebase.user(userSession.uid)
      .get()
      .then(doc => {
        if (doc && doc.exists) {
          const myData = doc.data()
          setUserData(myData)
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
    
    return () => {
      listener()
    }
  },[userSession, firebase, firebase.history, props.history])

  // To open Modal
  const openModal = () => {
    setShowModal(true)
  }

  // To close Modal
  const closeModal = () => {
    setShowModal(false)
  }

  // To open UploadModal and get friend to push on state
  const openUploadModal = (friend) => {
    // Get friend datas on State
    setFriendData({
      birthDate: friend.birthDate,
      fileUrl: friend.fileUrl,
      firstName: friend.firstName,
      id: friend.id,
      lastName: friend.lastName
    })
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal avant vaut: ${showUpdateModal}`);
    setShowUpdateModal(true)
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal après vaut: ${showUpdateModal}`);
    setTimeout(function() {
      // console.log(friendData);
    }, 2000)
  }

  // To close UploadModal
  const closeUploadModal = () => {
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal avant vaut: ${showUpdateModal}`);
    setShowUpdateModal(false)
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal après vaut: ${showUpdateModal}`);
  }

  if (showModal) {

    return (
      <Modal showModal={showModal}>
        <div className="container">
          <p className="close" onClick={closeModal}>X</p>
          <Create closeModal={closeModal}/>
        </div>
      </Modal>
    )
  } else if (showUpdateModal) {
    return (
    
      <UploadFriendModal showUpdateModal={showUpdateModal} friendData={friendData}>
        <div className="container">
          <p className="close" onClick={closeUploadModal}>X</p>
          <h3 className="modalTitle">{`Modification des informations de ${friendData.firstName}`}</h3>
          <Update friendData={friendData} closeUploadModal={closeUploadModal}/>
        </div>
      </UploadFriendModal>
    )
  } else {
    return (
      <>
    <Logout userData={userData} />
    <div className="container">
    <h3>{`Vous avez ${friends.length} amis enregistrés`}</h3>
      {friends.map((friend) => {
        const { id, firstName, lastName, birthDate, fileUrl } = friend;

        // One day Time in ms
        let oneDay = 1000 * 60 * 60 * 24

        //To set the present date
        let today = new Date()

        // To get the present year
        let currentYear = new Date().getFullYear()

        // Defined birthday
        let birthDay = new Date(birthDate) 
        console.log(`Date d'anniversaire de ${firstName} : ${birthDay}`)
        // To define the day of the borthday
        let dayOfBirthday = birthDay.getDay()
        console.log(`Jour d'anniversaire ${firstName} : ${dayOfBirthday}`)
        // To define the month of birthday
        let monthOfBirthday = birthDay.getMonth()
        console.log(`Mois d'anniversaire ${firstName} : ${monthOfBirthday}`)
        // To define the year of birthday
        let yearOfBirthday = birthDay.getFullYear()
        console.log(`Année d'anniversaire ${firstName} : ${yearOfBirthday}`)

        // To calculate next year's birthday if passed already
        if (today.getMonth() === monthOfBirthday && today.getDate() > dayOfBirthday) {
          birthDay.setFullYear(currentYear + 1)
          console.log(`%c Dans le if current year + 1 et ${firstName} est né le ${birthDate}`, 'color: red')
          console.log(`%c Dans le if 'current' vaut ${currentYear}`, 'color: red')
          console.log(`%c Dans le if 'birthDay' vaut ${birthDay}`, 'color: red')
        } else {
          birthDay.setFullYear(currentYear)
          console.log(`%c Dans le else current year et ${firstName} est né le ${birthDate}`, 'color: green')
          console.log(`%c Dans le else 'current' vaut ${currentYear}`, 'color: green')
          console.log(`%c Dans le else 'birthDay' vau ${birthDay}`, 'color: green')
        }
          
        // To calculate the result in ms and convertinfg into days
        let result = (Math.round(birthDay.getTime() - today.getTime()) / (oneDay)) + 1
        
        // to format the date
        let displayedResult = dayOfBirthday + "/" + monthOfBirthday + "/" + yearOfBirthday
        console.log(birthDate)
        
        // To remove the decimals from th result
        let daysRemaining = result.toFixed(0)

        return (
          <article key={id} className='person'>
            <div className="personDetails avatar">
              <img src={fileUrl} alt={firstName} />
            </div>
            <div className="personDetails infos">
              <h4>{firstName + ' ' +lastName}</h4>
              <p>Né(e) le {displayedResult}</p>
              <p>Dans {daysRemaining} jours</p>
            </div>
            <div className="personDetails icons">
              <button onClick={() => openUploadModal(friend)}><RiPencilLine/></button>
              <button onClick={() => deleteFriend(friend)}><RiDeleteBin2Line/></button>
            </div>
          </article>
        );
      })}
      <div className="footer">
        <Button type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--medium"
          onClick={openModal}
          >
            Ajouter un Anniversaire
        </Button>
      </div>
    </div>
    </>
    )
  }  
}

export default List;