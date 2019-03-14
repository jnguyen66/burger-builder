import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
  //Also no longer needed with redux
  // state={
  //   //Because we see this in mulitple containers classes its a good case for redux
  //   ingredients:null,
  //   totalPrice: 0

  // }

  // No longer needed with redux
  // componentWillMount(){
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients ={}
  //   let price=0;
  //   for (let param of query.entries()){
  //     //['salad', '1']
  //     if(param[0]==='price'){
  //       price=param[1];
  //     }else{
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price})
  // }


  checkoutCancelledHandler = () =>{
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () =>{
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return(
      <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
            />
            <Route
              path={this.props.match.path + '/contact-data'}
              // component={ContactData}
              //manual render we can access send props so that it can be accessed
              //By passing (props) in params, we can then access history, location, and match in contact data

              //Also not needed due to redux
              // render={(props)=>(<ContactData ingredients={this.props.ings} totalPrice={this.props.price} {...props}/> )}
              component={ContactData}/>
            />
      </div>

    )
  }

}

const mapStateToProps= state =>{
  return{
    ings: state.ingredients,
    price: state.totalPrice
  }
}

//No dispatch needed cause we are only routing here. 
//Therefore no redux dispatching needed
export default connect(mapStateToProps)(Checkout);
