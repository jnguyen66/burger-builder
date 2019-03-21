import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) =>{

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email: email,
            password: password,
            returnSecureToken: true
        }
        //checks whether user is trying to sign in or sign up. Changes url based on received signup variable
        let url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAYFxBpQroge8_1V9BCXFc1ZiUgdDVKcIg'
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAYFxBpQroge8_1V9BCXFc1ZiUgdDVKcIg'
        }
        //Firebase accepts two post variables. 1. is url, and the other is the token data
        axios.post(url, authData)
        .then(response =>{
            //Set expiration date by adding expiration time to date
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
            //Built in javascript storage. first arg is key, second is value
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error))
        })
    }

}

export const logout =()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}


export const logoutSucceed = ()=>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime)=>{
    // return dispatch =>{
    //     setTimeout(()=>{
    //         dispatch(logout());
    //     }, expirationTime*1000)
    // };
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime 
    }
};

export const setAuthRedirectPath = (path)=>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
        
};


export const authCheckState = ()=>{
    return dispatch =>{
        const token =localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            //New Date converts string from local storage to actual date
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            //if expiration date is later than current time, than you can dispatch login with token
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                //passing difference between exp date and current date in seconds
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000))

            }
            
        }
    }
        
};