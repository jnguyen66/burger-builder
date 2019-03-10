import React from 'react';
import classes from './Button.css';

/*Array of classes and props.btnType allows us to pass danger or success as a prop. Join turns the
array into a string.*/
const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    >
      {props.children}
  </button>
)

export default button;
