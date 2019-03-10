import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Auxilary from '../Auxilary/Auxilary';


const withErrorHandler = (WrapperComponent, axios) => {
  //no class name. Not needed. class factory
  return class extends Component{
    state ={
      error:null,
      reqInterceptor: null,
      resInterceptor: null
    }
    //you can use constructor instead of component will mount since this will be legacy
    componentWillMount(){
      this.reqInterceptor = axios.interceptors.request.use(req =>{
        this.setState({error: null})
        return req;
      })
      this.resInterceptor =axios.interceptors.response.use(res=>res, error=>{
        this.setState({error: error})
      });
    }
    //clean up function
    componentWillUnmount(){
      console.log(this.reqInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler=()=>(
        this.setState({error: null})
)
    render(){
    return(  <Auxilary>
        <Modal
          show={this.state.error}
          modalClosed={this.errorConfirmedHandler}
          >
        {this.state.error? this.state.error.message: null}
      </Modal>
      <WrapperComponent{...this.props}/>
      </Auxilary>
    )
    }
  }
}


export default withErrorHandler;
