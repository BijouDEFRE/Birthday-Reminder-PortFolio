import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';

const Read = () => {

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
            console.log(previousList);
        })
    }, [firebase.auth.currentUser.uid, firebase.db])

    return (
        <main>
      <section className='container'>
        {/* <h3>{friendList.map} birthdays today</h3> */}
        {/* <button onClick={() => setFriends([])}>clear all</button> */}
      </section>
    </main>
    )
}

export default Read;