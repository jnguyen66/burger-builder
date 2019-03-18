import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



configure({adapter: new Adapter()});

//Takes two arguments. One is a string , and a function
describe('<BurgerBuilder />', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    });

    it('should render <BuildControls/> when recieving ingredients', ()=>{
        wrapper.setProps({ings: {salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
    
});