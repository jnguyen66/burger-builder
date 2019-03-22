import React, {} from 'react';
import classes from './Modal.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props =>{
  //react.memo below is a great substitute for should component update
  // shouldComponentUpdate(nextProps, nextState){
  //   //checls to see if show props changed and the children of the modal i.e. loading changed
  //   return nextProps.show!==this.props.show || nextProps.children !== this.props.children;
  // }



    return(
      <Auxilary>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1':'0'
        }}>
        {props.children}
      </div>
      </Auxilary>
    )
  
}

//PureComponent works with classes. React.memo() works with functional components.
export default React.memo(
  modal, 
  (prevProps, nextProps)=>
  nextProps.show===prevProps.show && 
  nextProps.children === prevProps.children);
