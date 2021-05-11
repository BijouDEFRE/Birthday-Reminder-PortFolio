import React from 'react';

import './modal.css'

const Modal = ({showModal, children}) => {

  return (
    showModal && (
      <div className="modalBackground">
        {children}
      </div>
    )
  )
}

export default Modal;