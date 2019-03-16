import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{
  //no longer needed due to redux
  // state={
  //   orders: [],
  //   loading: true
  // }
  componentDidMount(){
    //grabs orders from firebase
    //No longer needed due to fetchOrders in order.js actions.REDUX
    // axios.get('/orders.json')
    // .then(res=>{
    //   let fetchedOrders =[];
    //   for (let key in res.data){
    //     fetchedOrders.push({
    //       ...res.data[key],
    //       id: key
    //     })
    //   }
    //   this.setState({loading: false, orders: fetchedOrders});
    // })
    // .catch(err=>{
    //   this.setState({loading: false });
    // })

    this.props.onFetchOrders()
  }
  render(){
    let orders = <Spinner/>;
    if(!this.props.loading){
      orders = this.props.orders.map(order=>(
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    }
    return(
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onFetchOrders: ()=>dispatch(actions.fetchOrders())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
