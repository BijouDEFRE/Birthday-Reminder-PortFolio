import React from 'react';

import './modal.css'

const UploadFriendModal = ({showUpdateModal, children}) => {

  return (
    showUpdateModal && (
      <div className="modalBackground">
        <h2>UploadFriendModal</h2>
        {children}
      </div>
    )
  )
}

export default UploadFriendModal;