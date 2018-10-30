import React from 'react';

const Button = ({onClick, text, className, type}) => (
  <button onClick={onClick} className={'btn-instance ' + className} type={ type ? type : null}>
    {text}
  </button>
);

export default Button;