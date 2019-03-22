import React, {} from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = props=> {
//This could be a functional component. Does not have to be a class
  // componentWillUpdate(){
  //   console.log('[OrderSummary] will update');
  // }

    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
      return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>)
    });

    return(
      <Auxilary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: ${props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>

      </Auxilary>
    );
  


};

export default orderSummary;
