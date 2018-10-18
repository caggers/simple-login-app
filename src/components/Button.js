import React from 'react';

const Button = ({onClick, text, className, type}) => (
  <button onClick={onClick} className={className} type={ type ? type : null}>
    {text}
  </button>
);

export default Button;