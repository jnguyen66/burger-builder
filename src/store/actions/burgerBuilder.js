import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

//able to return dispatch as a result of thunk. This will run this dispatch, then once complete will run setIngredients
export const initIngredients = () => {
    return dispatch => {
        //Pasted Async code from BurgerBuilder.js/componentwillmount() here
        axios.get('https://react-my-burger-fab61.firebaseio.com/ingredients.json')
          .then(response=>{
            dispatch(setIngredients(response.data))
          }).catch(error=>{
            dispatch(fetchIngredientsFailed())
          });
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
};