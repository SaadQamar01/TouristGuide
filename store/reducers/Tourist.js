import React from 'react';
import ActionTourist from '../action/touristAction.js'


function Tourist(state = [], action) {
  switch (action.type) {
    case ActionTourist.SIGNUP:
      // console.log(action.patientsData);
      return action.Data
    case ActionTourist.LOGIN:
      // console.log(action.patientsData);
      return action.Data
    default:
      return state
  }
}
export default Tourist;