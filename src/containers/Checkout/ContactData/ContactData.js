import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import  * as actions from '../../../store/actions/index';
import {updateObject} from '../../../shared/utility';
import {checkValidity} from '../../../shared/utility';

const contactData = props =>{
  // state = {
  //   //All local UI state
  //   orderForm:{
  //         name: {
  //             elementType: 'input',
  //             elementConfig: {
  //               type: 'text',
  //               placeholder: 'Your Name'
  //             },
  //             value: '',
  //             validation:{
  //               required: true
  //             },
  //             valid: false,
  //             touched: false
  //         },
  //         street: {
  //             elementType: 'input',
  //             elementConfig: {
  //               type: 'text',
  //               placeholder: 'Street'
  //             },
  //             value: '',
  //             validation:{
  //               required: true
  //             },
  //             valid: false,
  //             touched: false
  //         },
  //         zipCode: {
  //             elementType: 'input',
  //             elementConfig: {
  //               type: 'text',
  //               placeholder: 'Zipcode'
  //             },
  //             value: '',
  //             validation:{
  //               required: true,
  //               minLength: 5,
  //               maxLength: 5
  //             },
  //             valid: false,
  //             touched: false
  //         },
  //         country: {
  //             elementType: 'input',
  //             elementConfig: {
  //               type: 'text',
  //               placeholder: 'Country'
  //             },
  //             value: '',
  //             validation:{
  //               required: true
  //             },
  //             valid: false,
  //             touched: false
  //         },
  //         email: {
  //             elementType: 'input',
  //             elementConfig: {
  //               type: 'text',
  //               placeholder: 'Email'
  //             },
  //             value: '',
  //             validation:{
  //               required: true
  //             },
  //             valid: false,
  //             touched: false
  //         },
  //         deliveryMethod: {
  //             elementType: 'select',
  //             elementConfig: {
  //               options: [
  //                 {value: 'fastest', displayValue: 'Fastest'},
  //                 {value: 'cheapest', displayValue: 'Cheapest'}
  //             ]
  //             },
  //             value: 'fastest',
  //             validation: {},
  //             valid: true
  //         }

  //   },
  //   formIsValid: false,
  //   // loading: false
  // }


const [orderForm, setOrderForm] = useState({
          name: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
              },
              value: '',
              validation:{
                required: true
              },
              valid: false,
              touched: false
          },
          street: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Street'
              },
              value: '',
              validation:{
                required: true
              },
              valid: false,
              touched: false
          },
          zipCode: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Zipcode'
              },
              value: '',
              validation:{
                required: true,
                minLength: 5,
                maxLength: 5
              },
              valid: false,
              touched: false
          },
          country: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Country'
              },
              value: '',
              validation:{
                required: true
              },
              valid: false,
              touched: false
          },
          email: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Email'
              },
              value: '',
              validation:{
                required: true
              },
              valid: false,
              touched: false
          },
          deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                options: [
                  {value: 'fastest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
              ]
              },
              value: 'fastest',
              validation: {},
              valid: true
          }

    })
  
    const [formIsValid, setFormIsValid]=useState(false);

//Because we are dealing with forms must include event as param
//and prevent default so that the page does not load on submit click
  const orderHandler =(event)=>{
    event.preventDefault();
    // console.log(this.props.ingredients);

    // this.setState({loading: true});
    //creates empty object
    const formData ={}
    //loops thru orderForm
    for (let formElementIdentifier in orderForm){
      //sets key of form data to the first level(i.e. name, email, address)
      //and sets value to its corresponding value
      formData[formElementIdentifier]=orderForm[formElementIdentifier].value;
    }
    //Sends to firebase
    const order ={
      ingredients: props.ings,
      price: props.price,
      //data user entered into form
      orderData: formData,
      userId: props.userId
    }
    //second argument order is the data thats gets passed
    //.json is needed for firebase to form properly
    //No longer using below because it has been placed into order.js. Redux
    // axios.post('/orders.json', order)
    // .then(response => {
    //   this.setState({loading: false});
    //   this.props.history.push('/');
    // })
    // .catch(error => {
    //   this.setState({loading: false});
    // });

   props.onOrderBurger(order, props.token);
  }


 const inputChangeHandler =(event, inputIdentifier)=>{
  //Clones order form
  // const updatedOrderForm= {
  //   ...this.state.orderForm
  // }
  
  //Then uses updatedOrderForm to clone next level down which would include
  //elementType, elementConfig, and value
  // const updatedFormElement = {
  //   ...updatedOrderForm[inputIdentifier]
  // }

    // //Sets value equal to typed letters in event
    // updatedFormElement.value =event.target.value;
    // //Executes validiaty method passing value and rules as parameter, and sets valid to true
    // updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    // updatedFormElement.touched=true;

    // updatedOrderForm[inputIdentifier]=updatedFormElement;


  //Refactored from above and below
  const updatedFormElement = updateObject(orderForm[inputIdentifier], {
    value:event.target.value,
    valid:checkValidity(event.target.value, orderForm[inputIdentifier].validation),
    touched:true
  })

  const updatedOrderForm = updateObject(orderForm, {
    [inputIdentifier]: updatedFormElement
  })


  //Checks to see if form is valid by starting with true
  let formIsValid = true;
  //Loops thru updated form and checks if valid is true and formIsValid is true
  //If either are false, the whole expression will be false
  for (let inputIdentifier in updatedOrderForm){
    formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
  }
  
  // this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  //Refactored with hooks
  setOrderForm(updatedOrderForm);
  setFormIsValid(formIsValid);

}

    const formElementArray = [];
    for (let key in orderForm){
      formElementArray.push({
        id: key,
        config: orderForm[key]
      })
    }
    let form=(
      <form onSubmit={orderHandler}>
        {/*  <Input elementType='...' elementConfig='...' value='...'/>*/}
        {formElementArray.map(formElement =>(
          <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event)=>inputChangeHandler(event, formElement.id)}/>
        ))}
        {/* <Input inputtype='input' type='text' name='email' placeholder='Your email'/>
        <Input inputtype='input' type='text' name='street' placeholder='Your street'/>
        <Input inputtype='input' type='text' name='postal' placeholder='Postal Code'/> */}
        <Button btnType='Success'disabled={!formIsValid}>ORDER</Button>
      </form>
    )
    // console.log(form);
    if(props.loading){
      form=<Spinner/>
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact date</h4>
        {form}
      </div>
    )
  
}

const mapStateToProps= state =>{
  return{
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps= dispatch =>{
  return{
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
