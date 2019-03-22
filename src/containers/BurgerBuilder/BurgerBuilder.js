import React, {useEffect, useState} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';

//Now that we have action creators, no longer need this
// import * as actionTypes from '../../store/actions/actionsTypes'

//instead import index.
import * as actions from '../../store/actions/index'


export const burgerBuilder =props=>{
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }

  //no longer needed due to react hooks/ useState
  // state = {
  //   // ingredients: null,
  //   // totalPrice: 4,
  //   // You can manage these below thru redux but its mainly for local UI State items
  //   // Not necessary but possible
  //   // purchaseable: false,
  //   purchasing: false

  //   //No longer needed. Managed in reducer
  //   // loading: false,
  //   // error: false
  // }

  const [purchasing, setPurchasing]=useState(false)

  useEffect(()=>{
    props.onInitIngredients();
  }, []);

  //refactored with useefffect
// componentDidMount(){
// //Before thunk
// //   axios.get('https://react-my-burger-fab61.firebaseio.com/ingredients.json')
// //   .then(response=>{
// //     this.setState({ingredients: response.data})
// //   }).catch(error=>{
// //     this.setState({error: true})
// //   });

// //Now with thunk and action creators we can use redux asynchronously
// this.props.onInitIngredients();

// }

// addIngredientHandler=(type)=>{
//   //Grabs current number of specified ingredient
//   const oldCount =this.state.ingredients[type];
//   //Increases that number by 1
//   const updatedCounted =oldCount + 1;
//   //Creates a temp object copy of current ingredient state
//   const updatedIngredients ={
//     ...this.state.ingredients
//   };
//   //Updates specified type with updated count in the temp copy
//   updatedIngredients[type]=updatedCounted;
//   //Grabs global price of specified ingredient type
//   const priceAdditon = INGREDIENT_PRICES[type];
//   //Grabs total price from current state
//   const oldPrice = this.state.totalPrice;
//   //Sets new price by adding cuurent to item cost
//   const newPrice = oldPrice + priceAdditon;

// //Sets new price and ingredients with temp object copy. Important not to mutate state directly
//   this.setState({
//     totalPrice: newPrice,
//     ingredients: updatedIngredients
//   });
//   this.updatePurchaseState(updatedIngredients);
// }


// removeIngredientHandler=(type)=>{
//   //Grabs current number of specified ingredient
//   const oldCount =this.state.ingredients[type];
//   //Decreases that number by 1
//   if(oldCount>=1){
//     const updatedCounted =oldCount - 1;
//     //Creates a temp object copy of current ingredient state
//     const updatedIngredients ={
//       ...this.state.ingredients
//     };
//     //Updates specified type with updated count in the temp copy
//     updatedIngredients[type]=updatedCounted;
//     //Grabs global price of specified ingredient type
//     const priceReduction = INGREDIENT_PRICES[type];
//     //Grabs total price from current state
//     const oldPrice = this.state.totalPrice;
//     //Sets new price by subtracting item cost from current
//     const newPrice = oldPrice - priceReduction;

//   //Sets new price and ingredients with temp object copy. Important not to mutate state directly
//     this.setState({
//       totalPrice: newPrice,
//       ingredients: updatedIngredients
//     });
//     this.updatePurchaseState(updatedIngredients);
//   }else{
//     return;
//   }
// }

const updatePurchaseState=(ingredients)=>{
  //Pulls keys from the temp object
  const sum = Object.keys(ingredients)
  //Using those keys maps an array of values
  .map(igKey => {
    return ingredients[igKey];
  })
  //reduces the array of values to the sum of all elements starting with the number 0
  .reduce((sum, el) => {
    return sum + el;
  }, 0);
  //sets new state to true or false
  // this.setState({purchaseable: sum > 0})

  return  sum > 0;
}


const purchaseHandler = () =>{
  if (props.isAuthenticated){
    // this.setState({purchasing: true})
    setPurchasing(true)
  }else{
    props.onSetRedirectPath('/checkout');
    props.history.push('/auth')
  }
  
}

const purchaseCancelHandler =()=>{
  // this.setState({purchasing:false})
  setPurchasing(false)
}

const purchaseContinueHandler = ()=>{
  props.onInitPurchase()
  //With reux we no longer need to pass thru queryParams 
  //and can get ingredients from the store
//   //alert('You continue!')
//   const queryParams = [];
//   for (let i in this.state.ingredients){
//     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
//   }
//   queryParams.push('price='+this.state.totalPrice);
//   const queryString = queryParams.join('&');
  props.history.push('./checkout')
}

    const disabledInfo = {
      ...props.ings
    }
    for (let key in disabledInfo){
      disabledInfo[key] =   disabledInfo[key] <=0
    }

    let orderSummary=null


    let burger=props.error? <p>Ingredients couldnt be loaded!</p>: <Spinner/>

    //checks to see if there are ingreidents in the state then loads the burger.
    //otherise spinner will show
if(props.ings){
  burger =(
        <Auxilary><Burger
            ingredients={props.ings}
        />
          <BuildControls
          // because build controls already passes the ingredients as control 
          // types we do not need to do it here
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled = {disabledInfo}
            price={props.price}
            //execute immediately because we want to update the button
            //every time it renders
            purchaseable={updatePurchaseState(props.ings)}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
          />
      </Auxilary>
  )

  orderSummary=(<OrderSummary
    purchaseCanceled={purchaseCancelHandler}
    purchaseContinued={purchaseContinueHandler}
    ingredients={props.ings}
    price={props.price}
  />)
}

// if(this.state.loading){
//   orderSummary=<Spinner/>
// }

    return(
      <Auxilary>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </Auxilary>
    );
  
}

const mapStateToProps = state =>{
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

//Before action creators
// const mapDispatchToProps=dispatch=>{
//   return{
//     onIngredientAdded: (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
//     onIngredientRemoved: (ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
//   }
// }

//After action creators
const mapDispatchToProps=dispatch=>{
  return{
    onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: ()=>dispatch(actions.initIngredients()),
    onInitPurchase: ()=>dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(burgerBuilder, axios));
