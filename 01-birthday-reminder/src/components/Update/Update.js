import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';
import "./update.css";

const Update = (props) => {

  // console.log(props)

  const firebase = useContext(FirebaseContext);
  // const [friend, setFriend] = useState([])
  const [firstName, setFirstName] = useState(props.friendData.firstName);
  const [lastName, setLastName] = useState(props.friendData.lastName);
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate);
  const [friendId, setFriendId] = useState(props.friendData.id);
  const [profilImage, setProfilImage] = useState("");
  const [fileUrl, setFileUrl] = useState(props.friendData.fileUrl);

  console.log(props.friendData.id)

  const updateFriend = () => {
    console.log(friendId);
    firebase.revealFriend(firstName, lastName, birthDate, fileUrl, friendId)
    setFirstName('')
    setLastName('')
    setBirthDate('')
    setProfilImage('')
    setFriendId('')
    // props.friendData()
    props.closeModal()
  };

  const onFileChange = async (event) => {

    const file = event.target.files[0];
    console.log(file);
    const storageRef = firebase.storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    alert(`image ${fileUrl} téléchargée avec succés`);
    console.log(fileUrl);
  }

  return (
    <div className="update">
      {/* <h4>Ajouter un nouvel anniversaire</h4> */}
      <div className="form">
        <input
          type="text" required="required"
          placeholder={props.friendData.firstName}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text" required="required"
          placeholder={props.friendData.lastName}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="date" required="required"
          placeholder={props.friendData.birthDate}
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <input
          type="file"
          placeholder={props.friendData.fileUrl}
          value={profilImage}
          onChange={onFileChange}
        />
        <button
        className="btn"
        onClick={updateFriend}
        >Modifier</button>
      </div>
    </div>
  );
};

export default Update;