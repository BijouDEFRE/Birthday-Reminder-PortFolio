import React from 'react';

import './modal.css';
/* grace à la props "children", on peut récupérer les éléments contenus dans le composant
qui appelle "Modal" dans notre logique ici c'est List :
<Modal showModal={showModal} >
<div.......
ce sont tous les éléments contenus dans le composant appelé que l'on récupère ici */
const UpdateModal = ({showUpdateModal, children}) => {

  return (
    showUpdateModal && (
      <div className="modalBackground">
        {children}
      </div>
    )
  )
}

export default UpdateModal;