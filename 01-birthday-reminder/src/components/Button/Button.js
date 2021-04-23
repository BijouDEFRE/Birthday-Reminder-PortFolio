import React from 'react';

import './button.css';

const Button = ({
    children, type, event, name,
  }) => (
    <div>
      <button type={type} onClick={event} className="btn" name={name}>
        {children}
      </button>
    </div>
  );

export default Button;