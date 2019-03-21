import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
//applyMiddleware & compose is for thunk. Compose allows us to compose our own set of enhancers or middleware
//Its just another enhancer just like react dev tools
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
//combine reducers at this index file
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import { watchAuth } from './store/saga/index';
import createSagaMiddleware from 'redux-saga';

//This is for thunk. If in developent, redux dev tools will be availiblue. But if not it will not be.
// const composeEnhancers = process.env.NODE_ENV==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;

//Testing to make work on firefox
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//reducer combiner
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

//Passing reducer and react dev tools link. Can add multiple reducers. No middleware
// const store=createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//React dev tools link. Can add multiple reducers. Advanced with middleware (thunk)
const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);

const app = (
  <Provider store={store}>
  <BrowserRouter>
      <App/>
  </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
