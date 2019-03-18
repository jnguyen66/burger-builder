import React, {Component} from 'react';
import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
//Because navigation is a functional componenet. Its better to pass Auth state in this 
//container component, and then pass it from here to navigation
import {connect} from 'react-redux';

class Layout extends Component{
  state ={
    showSideDrawer: false
  }
sideDrawerClosedHandler=()=>{
  this.setState({showSideDrawer: false});
}

sideDrawerToggleHandler =()=>{
  //Clean way of setting state when it depends on previous state
  this.setState((prevState)=>{
    return {showSideDrawer: !this.state.showSideDrawer}
  })
}
  render(){
    return(
      <Auxilary>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxilary>
    )
  }
};

const mapStateToProps = state =>{
  return{
    //checks to see if there is a token. if there is, sets isauthenticated to true. If not, fail
    isAuthenticated: state.auth.token !==null
  }
}
export default connect(mapStateToProps)(Layout);
