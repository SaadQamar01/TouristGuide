import ActionSignup from "./../actions/actionSignup.js";
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Dashboard from './../../container/Dashboard.js';
//Update in counter 13 -- create Middleware
export default class MiddlewareSignup {

    static asyncSignup(detail) {
        return (dispatch) => {
            var Name   = detail.Name
            var Email   = detail.Email
            var Password   = detail.Password
            var isTrue   = false;
            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(Email, Password)
                .then(data => {
                    isTrue   = true
                    Actions.Dashboard();
                    dispatch(ActionSignup.signUp(isTrue))
                    alert('Signup Successfully')
                })
                .catch((error) => {
                    isTrue   = false
                    dispatch(ActionSignup.signUp(isTrue))
                    alert(JSON.stringify(error.message));
                })

        }
    }
}
