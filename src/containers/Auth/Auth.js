import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject} from '../../shared/utility';
import {checkValidity} from '../../shared/utility';

const auth = (props)=>{
    const [controls, setControls]=useState({
            email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'E-Mail Address'
                },
                value: '',
                validation:{
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                  type: 'password',
                  placeholder: 'Password'
                },
                value: '',
                validation:{
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false
            }
        })

        const [isSignup, setIsSignUp]=useState(true)
    

    // componentDidMount(){
    //     if(!this.props.buildingBurger&&this.props.authRedirectPath!=='./'){
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }
    useEffect(()=>{
        if(!props.buildingBurger&&props.authRedirectPath!=='./'){
            props.onSetAuthRedirectPath();
        }
    }, [])


      const inputChangeHandler = (event, controlName)=>{
        // const updatedControls =
        // {
        //     ...this.state.controls,
        //     [controlName]: {
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     }
        // }
        // this.setState({controls:updatedControls});


        //refactored from above
        const updatedControls =updateObject(controls, {
            [controlName]: updateObject(controls, {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })
        // this.setState({controls:updatedControls});
        setControls(updatedControls)
        
        
      }

     const  submitHandler=(event)=>{
          event.preventDefault();
          props.onAuth(controls.email.value, controls.password.value, isSignup)
      }

    //  switchAuthModeHandler=()=>{
    //       this.setState(prevState =>{
    //           return {isSignup: !prevState.isSignup};
    //       })
    //   }

      const  switchAuthModeHandler=()=>{
        setIsSignUp(!isSignup);
    }


        const formElementArray = [];
    for (let key in controls){
      formElementArray.push({
        id: key,
        config: controls[key]
      })
    }
    let form = formElementArray.map(formElement=>(
        //reusing Input tag from contact data
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>inputChangeHandler(event, formElement.id)}
        />
    ))

    //Check after form was created if loading is true
    if (props.loading){
        form = <Spinner/>
    }

    //Checks if error is true. Must access message from error object. firebase unique
    let errorMessage = null;
    if(props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirect =null
    if(props.isAuthenticated){
        //if burger is being built pass to checkout instead of home page to perserve build
        authRedirect=<Redirect to={props.authRedirectPath}/>
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
            <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
            clicked={switchAuthModeHandler}
            btnType="Danger">SWITCH TO {isSignup? "SIGNIN": "SIGN UP"}</Button>
        </div>
    )

}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(auth);