import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props)=>(
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      onClick={props.removed}
      className={classes.Less}
      disabled={props.disabled}
      >Less
    </button>
    {/*onClick is a built in react method*/}
    <button
      onClick={props.added}
      onClick={props.added}
      className={classes.More}
      >More
    </button>
  </div>
);

export default buildControl;
