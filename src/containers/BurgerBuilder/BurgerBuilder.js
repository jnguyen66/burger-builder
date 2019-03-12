import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

componentDidMount(){
  axios.get('https://react-my-burger-fab61.firebaseio.com/ingredients.json')
  .then(response=>{
    this.setState({ingredients: response.data})
  }).catch(error=>{
    this.setState({error: true})
  });
}

addIngredientHandler=(type)=>{
  //Grabs current number of specified ingredient
  const oldCount =this.state.ingredients[type];
  //Increases that number by 1
  const updatedCounted =oldCount + 1;
  //Creates a temp object copy of current ingredient state
  const updatedIngredients ={
    ...this.state.ingredients
  };
  //Updates specified type with updated count in the temp copy
  updatedIngredients[type]=updatedCounted;
  //Grabs global price of specified ingredient type
  const priceAdditon = INGREDIENT_PRICES[type];
  //Grabs total price from current state
  const oldPrice = this.state.totalPrice;
  //Sets new price by adding cuurent to item cost
  const newPrice = oldPrice + priceAdditon;

//Sets new price and ingredients with temp object copy. Important not to mutate state directly
  this.setState({
    totalPrice: newPrice,
    ingredients: updatedIngredients
  });
  this.updatePurchaseState(updatedIngredients);
}


removeIngredientHandler=(type)=>{
  //Grabs current number of specified ingredient
  const oldCount =this.state.ingredients[type];
  //Decreases that number by 1
  if(oldCount>=1){
    const updatedCounted =oldCount - 1;
    //Creates a temp object copy of current ingredient state
    const updatedIngredients ={
      ...this.state.ingredients
    };
    //Updates specified type with updated count in the temp copy
    updatedIngredients[type]=updatedCounted;
    //Grabs global price of specified ingredient type
    const priceReduction = INGREDIENT_PRICES[type];
    //Grabs total price from current state
    const oldPrice = this.state.totalPrice;
    //Sets new price by subtracting item cost from current
    const newPrice = oldPrice - priceReduction;

  //Sets new price and ingredients with temp object copy. Important not to mutate state directly
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }else{
    return;
  }
}

updatePurchaseState(ingredients){
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
  this.setState({purchaseable: sum > 0})
}


purchaseHandler = () =>{
  this.setState({purchasing: true})
}

purchaseCancelHandler =()=>{
  this.setState({purchasing:false})
}

purchaseContinueHandler = ()=>{
  //alert('You continue!')
  const queryParams = [];
  for (let i in this.state.ingredients){
    queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
  }
  queryParams.push('price='+this.state.totalPrice);
  const queryString = queryParams.join('&');
  this.props.history.push({
    pathname: '/checkout',
    search: '?'+queryString
  })

}
  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo){
      disabledInfo[key] =   disabledInfo[key] <=0
    }

    let orderSummary=null


    let burger=this.state.error? <p>Ingredients couldnt be loaded!</p>: <Spinner/>

    //checks to see if there are ingreidents in the state then loads the burger.
    //otherise spinner will show
if(this.state.ingredients){
  burger =(
        <Auxilary><Burger
            ingredients={this.state.ingredients}
        />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled = {disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
      </Auxilary>
  )

  orderSummary=(<OrderSummary
    purchaseCanceled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}
    ingredients={this.state.ingredients}
    price={this.state.totalPrice}
  />)
}

if(this.state.loading){
  orderSummary=<Spinner/>
}

    return(
      <Auxilary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </Auxilary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
