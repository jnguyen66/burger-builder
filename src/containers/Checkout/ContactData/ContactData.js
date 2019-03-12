import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
  state = {
    orderForm:{
          name: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
              },
              value: ''
          },
          street: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Street'
              },
              value: ''
          },
          zipCode: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Zipcode'
              },
              value: ''
          },
          country: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Country'
              },
              value: ''
          },
          email: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Email'
              },
              value: ''
          },
          deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                options: [
                  {value: 'fastest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
              ]
              },
              value: ''
          }

    },
    loading: false
  }
//Because we are dealing with forms must include event as param
//and prevent default so that the page does not load on submit click
  orderHandler =(event)=>{
    event.preventDefault();
    console.log(this.props.ingredients);
    //.json is needed for firebase to form properly


    this.setState({loading: true});

    //Sends to firebase
    const order ={
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Justin Nguyen',
        address: {
          street: 'Teststreet 1',
          zipCode: '90013',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    //second argument order is the data thats gets passed
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({loading: false});
    });
  }

  render(){
    let form=(
      <form>
        <Input elementType='...' elementConfig='...' value='...'/>
        {/* <Input inputtype='input' type='text' name='email' placeholder='Your email'/>
        <Input inputtype='input' type='text' name='street' placeholder='Your street'/>
        <Input inputtype='input' type='text' name='postal' placeholder='Postal Code'/> */}
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    )
    if(this.state.loading){
      form=<Spinner/>
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact date</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
