import React, {Component} from 'react';
import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
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


export default Layout;
