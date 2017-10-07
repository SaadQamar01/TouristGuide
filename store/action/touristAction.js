export default class ActionTourist {

    // static properties to be used in reducer for switch cases
    static SIGNUP = "SIGNUP";
    static LOGIN = "LOGIN";
    // static DELETE_ALL_PATIENT = "DELETE_ALL_PATIENT";


    // static functions to be mapped with dispatch in component
    static signUp(data) {
        return { 
            type: this.SIGNUP,
            Data: data
        }
    }
    static login(data) {
        return { 
            type: this.LOGIN,
            Data: data
        }
    }
    // static deletePatient(index) {
    //     return {
    //          index:index
    //     }
    // }
    // static deleteAllPatient() {
    //     return {
    //         type: 'DELETE_ALL_TODO'
    //     }
    // }
}