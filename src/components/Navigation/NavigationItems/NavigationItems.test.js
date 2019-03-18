import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()});

//Takes two arguments. One is a string , and a function
describe('<NavigationItems />', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>)
    });

    it('should render two <NavigationItem/> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elements if authenticated', ()=>{
        //Passing in isAuthenticated as a prop sets as true
       // wrapper = shallow(<NavigationItems isAuthenticated/>);
       //or
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should expect log out button', ()=>{
        //each test runs independently of other. before each resets wrapper so we have to put
        //isauthenticated true again
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout' >Logout</NavigationItem>)).toEqual(true);
    });
});