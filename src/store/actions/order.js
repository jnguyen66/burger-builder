import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


//Synchronous
export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

//Synchronous
export const purchaseBurgerFail = (error)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

//Asynchronous. Purchase burger also will require a token. You add token as a param and pass it
//into the querey parameter "?auth=" + token
export const purchaseBurger = (orderData, token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
        //   this.setState({loading: false});
        //   this.props.history.push('/');

        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
        //   this.setState({loading: false});

        dispatch(purchaseBurgerFail(error))
        });
    }
}

export const purchaseInit = ()=>{
    return {
        type: actionTypes.PURCHASE_INIT
    }
}



export const fetchOrdersSuccess = (orders)=>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error)=>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = ()=>{
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}


export const fetchOrders =(token,userId)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        //'&orderBy=userId&equalTo=' orders by that user and only fetches orders whom have that user id
        const quereyParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+quereyParams)
    .then(res=>{
      let fetchedOrders =[];
      for (let key in res.data){
        fetchedOrders.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(fetchOrdersSuccess(fetchedOrders))
    //loading can be changed in reducer
    //   this.setState({loading: false, orders: fetchedOrders});
    })
    .catch(err=>{
        dispatch(fetchOrdersFail(err))
    //loading can be changed in reducer
    //   this.setState({loading: false });
    })
    }
}