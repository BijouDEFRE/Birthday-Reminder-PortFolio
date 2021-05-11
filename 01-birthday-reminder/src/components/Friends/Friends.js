import React, { useContext, useState, useEffect, Fragment } from 'react';
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';
import 'firebase/auth';

const Friends = () => {

  const firebase = useContext(FirebaseContext);

    const [friendList, setFriendList] = useState([]);

    useEffect(() => {

        let userLogged = firebase.auth.currentUser.uid

        firebase.db.collection('users').doc(userLogged).collection('friends').onSnapshot((snapshot) => {
            
            let previousList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setFriendList(previousList);
            // console.table(previousList);
        })
    }, [])

  return (
      <Fragment>
          {friendList.map((friend) => {
            const { id, firstName, lastName, birthDate, fileUrl } = friend;
            return (
              <article key={id} className='person'>
                <img src={fileUrl} alt={firstName} />
                <div>
                  <h4>{firstName + ' ' + lastName}</h4>
                  <p>{birthDate}</p>
                </div>
              </article>
            );
          })}
      </Fragment>
  );
};

export default Friends;