import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError]=useState(null)
   
    //you can use constructor instead of component will mount since this will be legacy

      const reqInterceptor = httpClient.interceptors.request.use(req =>{
        setError(null);
        return req;
      })
      const resInterceptor =httpClient.interceptors.response.use(res=>res, err=>{
        setError(err);
      });
    
    //clean up function. Cleans whenever the interceptors change
    useEffect(()=>{
      return ()=>{
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor)
      }
    }, [reqInterceptor, resInterceptor])
 


    const errorConfirmedHandler=()=>{
       setError(null)
    }

return [error, errorConfirmedHandler];
}