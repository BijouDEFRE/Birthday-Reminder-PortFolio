import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';
import "./create.css";

const Create = () => {
  const firebase = useContext(FirebaseContext);
  // const [friend, setFriend] = useState([])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilImage, setProfilImage] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  
  const createFriend = () => {

    firebase.addFriend(firstName, lastName, birthDate, fileUrl)
    setFirstName('')
    setLastName('')
    setBirthDate('')
    setProfilImage('');
  };

  const onFileChange = async (event) => {

    const file = event.target.files[0];
    console.log(file);
    const storageRef = firebase.storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    console.log(fileUrl);
  }

  return (
    <div className="create">
      <h4>Ajouter un nouvel anniversaire</h4>
      <div className="form">
        <input
          type="text" required="required"
          placeholder="FirstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text" required="required"
          placeholder="LastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="date" required="required"
          placeholder="Date d'anniversaire"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <input
          type="file"
          placeholder="Photo de profil"
          value={profilImage}
          onChange={onFileChange}
        />
        <button className="btn" onClick={createFriend}>Ajouter</button>
      </div>
    </div>
  );
};

export default Create;