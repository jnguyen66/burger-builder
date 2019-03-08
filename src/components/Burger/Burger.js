import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  //Object.keys pulls the keys from the ingredients array
  const transformedIngredients = Object.keys(props.ingredients)
  //based on those keys you map
  .map(igKey => {
    //into a copied array using the Key values to access the number ingredients
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      //to map how many ingredient components based on the igKey index
      return <BurgerIngredient key={igKey + i} type={igKey}/>
    });
  });
    return(
      <div className={classes.Burger}>
        <BurgerIngredient type='bread-top'/>
        {transformedIngredients}
        <BurgerIngredient type='bread-bottom'/>

      </div>
    );
}

export default burger;
