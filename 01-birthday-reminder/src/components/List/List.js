/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { FirebaseContext } from '../Firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import Logout from '../Logout/Logout';
import Button from '../Button/Button';
import Create from '../Create/Create';
import Update from '../Update/Update';
import Modal from '../Modal/Modal';

// Import tools
import ReactTooltip from 'react-tooltip';
import { RiPencilLine } from 'react-icons/ri';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import './list.css';

// create a variable for use in a new array
const List = props => {

  // Firebase context
  const firebase = useContext(FirebaseContext);
  // Get user from firebase
  const userAuth = firebase.auth.X;

  // Initialise userSession state
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [friendData, setFriendData] = useState({});

  // To get friends for users account
  useEffect(() => {
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
  }, [userAuth]);

  // To delete Friends
  function deleteFriend(friend) {

    Swal.fire({
      title: `Vous allez supprimer ${friend.firstName} !`,
      text: `${friend.firstName} n'apparaîtra plus dans votre liste`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1aa179',
      cancelButtonColor: '#bb2525',
      confirmButtonText: 'Oui !',
      cancelButtonText: 'Non !',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé !',
          `${friend.firstName} a bien été supprimé`
        );
        // console.log(friend.id)
        app
        .firestore()
        .collection('users')
        .doc(userAuth)
        .collection('friends').doc(friend.id).delete()
      }
    })
  };
  
  useEffect(() => {
    // To listen if there is a autenticated user
    let listener = firebase.auth.onAuthStateChanged(user => {
      // if not, redirect on '/'
      user ? setUserSession(user) : props.history.push('/')
    });
    
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
    };
    
    return () => {
      // To cleanUp. stop the listener
      listener()
    };
  }, [userSession, firebase, firebase.history, props.history]);

  // To open Modal
  const openModal = () => {
    setShowModal(true)
  };

  // To close Modal
  const closeModal = () => {
    setShowModal(false)
  };

  // To open UploadModal
  const openUpdateModal = (friend) => {
    // Get friend datas on State
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
    }, 2000)
  };

  // To close UploadModal
  const closeUpdateModal = () => {
    setShowUpdateModal(false)
  };

  if (showModal) {
    return (
      <Modal showModal={showModal} >
        <div className="container">
          <p className="close" onClick={closeModal}>Fermer la fenêtre</p>
        <Create closeModal={closeModal}/>
        </div>
      </Modal>
    );
  } else if (showUpdateModal) {
    return (
      <Modal showUpdateModal={showUpdateModal} friendData={friendData}>
        <div className="container">
          <p className="close" onClick={closeUpdateModal}>Fermer la fenêtre</p>
          <h3 className="modalTitle">{`Informations sur ${friendData.firstName} ${friendData.lastName}`}</h3>
          <Update friendData={friendData} closeModal={closeUpdateModal}/>
        </div>
      </Modal>
    );
  } else {
    return (
      <Fragment>
        <div className="container">
        <Logout userData={userData} />

        {/* To use singular or plurial */}
        <h3>{friends.length === 1 ? `Vous avez ${friends.length} ami enregistré` : `Vous avez ${friends.length} amis enregistrés` }</h3>
        {/* <h3>{`Vous avez ${friends.length} amis enregistrés`}</h3> */}
        
          {friends.map((friend) => {
            const { id, firstName, lastName, birthDate, fileUrl } = friend;

            // One day Time in ms
            let oneDay = 1000 * 60 * 60 * 24;
    
            //To set the present date
            let today = new Date();
    
            // To get the present year
            let currentYear = new Date().getFullYear();
    
            // Defined birthday
            let birthDay = new Date(birthDate);
            // console.log(`%c Date d'anniversaire de ${firstName} : ${birthDay}`, 'background: #222; color: #bada66')
    
            // To define the day of the birthday
            let dayOfBirthday = birthDay.getDate();
            // console.log(`Jour d'anniversaire ${firstName} : ${dayOfBirthday}`)
    
            // To define the month of birthday
            let monthOfBirthday = birthDay.getMonth();
            // console.log(`Mois d'anniversaire ${firstName} : ${monthOfBirthday}`)
            
            // To define the year of birthday
            let yearOfBirthday = birthDay.getFullYear();
            // console.log(`Année d'anniversaire ${firstName} : ${yearOfBirthday}`)
            // console.log(`%c La valeur de getDate ${today.getDate()}`, 'background: green; color: #bada66')

            // Add one year if birthday is < today 
            // Si today.getMonth()(vaut:4) est supérieur ou égal à monthOfBirthday(vaut: 3) et que 
            // today.getDate()(vaut: 18) est inférieur à dayofBirthDay(vaut: 19)
            // Si c'est vrai, alors ajoute un an à currentyear. Sinon, met la valeur de currentyear(2021) à birthday
            today.getMonth() >= monthOfBirthday && today.getDate()+1 > dayOfBirthday ? (
              birthDay.setFullYear(currentYear + 1)
              // console.log(`%c Dans le if current year + 1 et ${firstName} est né le ${birthDate}`, 'color: red'),
              // console.log(`%c Dans le if 'current' vaut ${currentYear}`, 'color: red'),
              // console.log(`%c Dans le if 'birthDay' vaut ${birthDay}`, 'color: red')
            )
            :
            (
              birthDay.setFullYear(currentYear)
              // console.log(`%c Aujourd'hui nous sommes le ${today.getDate()}, ${today.getMonth()+1}`, 'background: #222; color: white'),
              // console.log(`%c Dans le else current year et ${firstName} est né le ${birthDate}`, 'background: #666; color: white'),
              // console.log(`%c Dans le else 'current' vaut ${currentYear}`, 'background: #666; color: white'),
              // console.log(`%c Dans le else 'birthDay' vaut ${birthDay}`, 'background: #666; color: white')
            )
              
            // To calculate the result in ms and convertinfg into days
            let result = (Math.round(birthDay.getTime() - today.getTime()) / (oneDay)) + 1;
            
            // to format the date
            let displayedResult = dayOfBirthday + "-" + (monthOfBirthday + 1) + "-" + yearOfBirthday;
            // console.log(`%c ${firstName} : ${birthDate}`, 'background: #222; color: #bada55');
            
            // To remove the decimals from th result
            let daysRemaining = result.toFixed(0);

            return (
              <article key={id} className='person'>
                <div className="person__avatar">
                  <img src={fileUrl} alt={firstName} />
                </div>
                <div className="person__infos">
                  <h4>{firstName + ' ' +lastName}</h4>
                  <p>Né(e) le {displayedResult}</p>
                  <p>Anniversaire dans {daysRemaining} jour(s)</p>
                </div>

                <div className="person__icons">
                  <button data-tip data-for="Modifier"
                  onClick={() => openUpdateModal(friend)}>
                    <RiPencilLine/>
                    </button>
                  <ReactTooltip id="Modifier" place="left" type="success" effect="solid">Modifier</ReactTooltip>

                  <button data-tip data-for="Supprimer"
                  onClick={() => deleteFriend(friend)}>
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