import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import 'firebase/firestore';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import Swal from 'sweetalert2';
import "./create.css";

const Create = (props) => {
  
  const firebase = useContext(FirebaseContext);
  // const [friend, setFriend] = useState([])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilImage, setProfilImage] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [btn, setBtn] = useState(false);
  const [loader , setLoader] = useState(false);

  // Show button when fileUrl is upload
  useEffect(() => {
    if (fileUrl !== null) {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }
  }, [btn, fileUrl]);

  // Get today date
  let today = new Date().toISOString().split('T')[0];
  
  const createFriend = () => {

    firebase.addFriend(firstName, lastName, birthDate, fileUrl);
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setProfilImage('');
    props.closeModal();
    Swal.fire(
      `Les informations sur ${firstName} sont créées`,
      // 'success'
    );
  };

  const onFileChange = async (event) => {

    setLoader(true);
    const file = event.target.files[0];
    console.log(file);
    const storageRef = firebase.storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    console.log(fileUrl);
    Swal.fire(
      'OK',
      `image ${file.name} téléchargée avec succés`);
      setLoader(false)
  };

  // To show Loader untill fileUrl is not null
  const showLoader = loader ? <Loader loadingMsg={"Chargement de la photo veuillez patienter..."}
  styling={{textAlign: 'center', marginBottom: '1rem'}} /> : ""
  
  return (
    <div className="create">
      <h4>Ajouter un anniversaire</h4>
      {showLoader}
      <div className="form">
        <input
          type="text"
          placeholder="FirstName"
          required="required"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          placeholder="LastName"
          required="required"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="date"
          placeholder="Date d'anniversaire"
          required="required"
          value={birthDate}
          max={today}
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <input
          type="file"
          placeholder="Photo de profil"
          value={profilImage}
          onChange={onFileChange}
        />
        { btn ? <Button onClick={createFriend}>Ajouter</Button> : <Button disabled={true}>Ajouter</Button>}
        {/* <button className="btn" onClick={createFriend} disabled={true}>Ajouter</button> */}
      </div>
    </div>
  );
};

export default Create;