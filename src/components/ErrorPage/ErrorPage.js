import React from 'react';

import Oups from '../../assets/images/404.png';
import './errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error">
      <img src={Oups} alt="error page"/>
    </div>
  )
}

export default ErrorPage;