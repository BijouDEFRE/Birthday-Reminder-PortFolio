import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import "./update.css";

const Update = (props) => {

  // console.log(props)

  const firebase = useContext(FirebaseContext);
  // const [friend, setFriend] = useState([])
  const [firstName, setFirstName] = useState(props.friendData.firstName);
  const [lastName, setLastName] = useState(props.friendData.lastName);
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate);
  const [friendId, setFriendId] = useState(props.friendData.id);
  const [profilImage, setProfilImage] = useState('');
  const [fileUrl, setFileUrl] = useState(props.friendData.fileUrl);
  const [loader , setLoader] = useState(false);

  const onFileChange = async (event) => {

    setLoader(true);
    const file = event.target.files[0];
    console.log(file);
    const storageRef = firebase.storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    Swal.fire(
      'OK',
      `image ${file.name} téléchargée avec succés`,
      'success');
    console.log(fileUrl);
    setLoader(false);
  };

  // Get today date
  let today = new Date().toISOString().split('T')[0];

  const updateFriend = () => {
    // console.log(friendId);
    firebase.revealFriend(firstName, lastName, birthDate, fileUrl, friendId);
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setProfilImage('');
    setFriendId('');
    // props.friendData()
    props.closeModal();
    Swal.fire(
      `Les informations de ${firstName} sont modifiées`,
      // 'success'
    );
  };

  // To show Loader untill fileUrl is not null
  const showLoader = loader ? <Loader loadingMsg={"Chargement de la photo veuillez patienter..."}
  styling={{textAlign: 'center', marginBottom: '1rem'}} /> : ""

  return (
    <div className="update">
      {/* <h4>Ajouter un nouvel anniversaire</h4> */}
      {showLoader}
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
          max={today}
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <input
          type="file"
          placeholder={props.friendData.profilImage}
          value={profilImage}
          onChange={onFileChange}
        />
        <Button
        className="btn"
        onClick={updateFriend}
        // disabled={true}
        >Modifier</Button>
      </div>
    </div>
  );
};

export default Update;