/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { FirebaseContext } from '../Firebase';
import app from 'firebase/app'
import 'firebase/auth'

const UpdateDelete = ({ friends }) => {

    const [update, setUpdate] = useState(false);
    const [friendUpdate, setFriendUpdate] = useState(null);

    const updateItem = () => {
        let friend = firebase.database().ref('friends').child(friends.id)
    }

    return (
        <div>
            TEST
        </div>
    )
}

export default UpdateDelete;
