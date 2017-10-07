import React from 'react';
import { createStore } from 'redux';
import {combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Tourist from './reducers/Tourist.js';
// import patientsList from './reducers/patientsList.js';

const middleware = applyMiddleware(thunk);
var combineReducer=combineReducers({Tourist})
let store = createStore(combineReducer,middleware);
// store.subscribe(() =>
  // console.log(store.getState())
// )
export default store;