import React, { useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary';


const withErrorHandler = (WrapperComponent, axios) => {
  //no class name. Not needed. class factory
  return props => {
   const [error, setError]=useState(null);
   
    //you can use constructor instead of component will mount since this will be legacy

      const reqInterceptor = axios.interceptors.request.use(req =>{
        setError(null);
        return req;
      })
      const resInterceptor =axios.interceptors.response.use(res=>res, err=>{
        setError(err);
      });
    
    //clean up function. Cleans whenever the interceptors change
    useEffect(()=>{
      return ()=>{
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor)
      }
    }, [reqInterceptor, resInterceptor])
 


    const errorConfirmedHandler=()=>(
       setError(null)
)

    return(  <Auxilary>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}
          >
        {error? error.message: null}
      </Modal>
      <WrapperComponent{...props}/>
      </Auxilary>
    )
    
  }
}


export default withErrorHandler;
