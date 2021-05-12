import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';
import "./update.css";

const Update = (props) => {

  console.log(props)

  const firebase = useContext(FirebaseContext);
  // const [friend, setFriend] = useState([])
  const [firstName, setFirstName] = useState(props.friendData.firstName);
  const [lastName, setLastName] = useState(props.friendData.lastName);
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate);
  const [profilImage, setProfilImage] = useState("");
  const [fileUrl, setFileUrl] = useState(props.friendData.fileUrl);

  console.log(firstName, lastName, birthDate, fileUrl);

  const firstNameChange = (event) => {
    setFirstName('')
    setFirstName(event.target.value)
  }
  const lastNameChange = (event) => {
    setLastName('')
    setLastName(event.target.value)
  }
  const birthDateChange = (event) => {
    setBirthDate('')
    setBirthDate(event.target.value)
  }
  // const fileUrlChange = (event) => {
  //   setFileUrl('')
  //   setFileUrl(event.target.value)
  // }
  
  // const updateFriend = () => {

  //   // firebase.addFriend(firstName, lastName, birthDate, fileUrl)
  //   setFirstName('')
  //   setLastName('')
  //   setBirthDate('')
  //   setProfilImage('')
  //   props.friendData()
  //   props.closeModal()
  // };

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
    <div className="update">
      {/* <h4>Ajouter un nouvel anniversaire</h4> */}
      <div className="form">
        <input
          type="text" required="required"
          placeholder={props.friendData.firstName}
          value={firstName}
          onChange={firstNameChange}
        />
        <input
          type="text" required="required"
          placeholder={props.friendData.lastName}
          value={lastName}
          onChange={lastNameChange}
        />
        <input
          type="date" required="required"
          placeholder={props.friendData.birthDate}
          value={birthDate}
          onChange={birthDateChange}
        />
        <input
          type="file"
          placeholder={props.friendData.fileUrl}
          value={profilImage}
          onChange={onFileChange}
        />
        <button
        className="btn"
        // onClick={updateFriend}
        >Ajouter</button>
      </div>
    </div>
  );
};

export default Update;