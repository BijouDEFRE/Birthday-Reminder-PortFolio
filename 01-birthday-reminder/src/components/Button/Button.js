import React from 'react';

import './button.css';

const Button = ({
    children,
    styling,
    type,
    onClick,
    event,
    disabled,
    name
}) => (
    <div>
      <button type={type} onClick={onClick} className="btn" style={styling} name={name} disabled={disabled}>
        {children}
      </button>
    </div>
  );

export default Button;