import React from 'react';

import './button.css';

const Button = ({
    children,
    type,
    onClick,
    event,
    name
  }) => (
    <div>
      <button type={type} onClick={onClick} className="btn" name={name}>
        {children}
      </button>
    </div>
  );

export default Button;