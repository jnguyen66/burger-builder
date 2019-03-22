import React, { } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrapperComponent, axios) => {
  //no class name. Not needed. class factory
  return props => {
   //moved body logic to http-error-handler
    const [error, clearError] = useHttpErrorHandler(axios);

    return(  <Auxilary>
        <Modal
          show={error}
          modalClosed={clearError}
          >
        {error? error.message: null}
      </Modal>
      <WrapperComponent {...props}/>
      </Auxilary>
    )
    
  }
}


export default withErrorHandler;
