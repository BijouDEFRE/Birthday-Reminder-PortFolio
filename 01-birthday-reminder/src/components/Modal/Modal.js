import React from 'react';

import './modal.css';
/* grace à la props "children", on peut récupérer les éléments contenus dans le composant
qui appelle "Modal" dans notre logique ici c'est List :
<Modal showModal={showModal} >
<div.......
ce sont tous les éléments contenus dans le composant appelé que l'on récupère ici */
const Modal = ({showModal, showUpdateModal, children}) => {

  if (showModal) {
    return (
      <div className="modalBackground">
        {children}
      </div>
    )
  } else if (showUpdateModal) {
    return (
      <div className="modalBackground">
        {children}
      </div>
    )
  }
}

export default Modal;