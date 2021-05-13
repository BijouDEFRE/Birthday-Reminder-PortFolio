import React from 'react';

import './modal.css'

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