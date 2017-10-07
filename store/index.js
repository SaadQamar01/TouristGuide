import React from 'react';
import { createStore } from 'redux';
import {combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerSignup from './reducers/reducerSignup.js';
import reducerLogin from './reducers/reducerLogin.js';
// import patientsList from './reducers/patientsList.js';

const middleware = applyMiddleware(thunk);
var combineReducer=combineReducers({reducerSignup,reducerLogin})
let store = createStore(combineReducer,middleware);
// store.subscribe(() =>
  // console.log(store.getState())
// )
export default store;