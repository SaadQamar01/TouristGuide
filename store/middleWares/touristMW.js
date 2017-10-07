import ActionTourist from "./../action/touristAction.js";
import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase';
//Update in counter 13 -- create Middleware
export default class Middleware {

    static asyncSignUp(detail) {
        return (dispatch) => {
            var name=detail.Name
            var email=detail.Email
            var password=detail.Password

        }
    }
    static asyncLoadPatient() {
        return (dispatch) => {

        }
    }
    static asyncDeletePatient(index) {
        // console.log("test ",data);
        return (dispatch) => {
 
        }
    }
    static asyncDeleteAllPatient() {
        // console.log("test ",data);
        return (dispatch) => {

        }
    }
    }
