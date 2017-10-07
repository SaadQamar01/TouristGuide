import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import store from './../store/index.js';
import SignUp from './SignUp.js'
import Middleware from './../store/middleWares/touristMW.js';
import * as firebase from 'firebase';
import Dashboard from './Dashboard.js';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
// function mapStateToProps(state) {
//   return {
//     patientsData: state.patientsData,
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     patientDetail: (data) => dispatch(PatientMiddleware.asyncAddPatient(data)),
//     loadPatients: () => {
//       dispatch(PatientMiddleware.asyncLoadPatient())
//     }
//     ,
//     deleteAllPatients: () => dispatch(PatientMiddleware.asyncDeleteAllPatient()),
//     deletePatient: (index) => dispatch(PatientMiddleware.asyncDeletePatient(index)),
//   }
// }
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: ''
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser) {
        Actions.Dashboard()
      }
    })
  }
  login() {
    var userEmail = this.state.Email;
    var userPassword = this.state.Password;
        if(userEmail==''||userPassword==''){
      alert("Please Fill Email & Password")
    }
    else{
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        // this.props.history.push('/student');
        Actions.Dashboard({})
      })
      .catch(function (error) { alert(error) })
    }
  }

  render() {

    return (
      // <BackgroundImage>

      // </BackgroundImage>
      <Image source={require('../Images/bg.jpg')}
        style={styles.backgroundImage}>
        <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
        <View style={styles.container}>
          <Form>
            <Item floatingLabel>
              <Label>Email:</Label>
              <Input onChangeText={(Email) => this.setState({ Email })} />
            </Item>
            <Item floatingLabel>
              <Label>Password:</Label>
              <Input onChangeText={(Password) => this.setState({ Password })} />
            </Item>
            <Button active info full onPress={this.login.bind(this)} style={styles.login}>
              <Text>Login</Text>
            </Button>
            <Button active info full onPress={() => Actions.SignUp({})} style={styles.signup}>
              <Text>SignUp</Text>
            </Button>
          </Form>
        </View>
      </Image>
    );
  }
}

// export default connect(mapStateToProps)(Login)
const styles = StyleSheet.create({
  container: {
    // width:300,
    // height:200,
    position: 'relative',
    top: 20,
    padding: 40,
    // backgroundColor: '#ffffff',
    // opacity: 0.7
  },
    headerLogo: {
    // height: 50,
    // width: 900,
    // flex: 1,
    width: '100%',
    height: 60,
    resizeMode: 'stretch',
    // opacity:1
  },
  login: {
    marginTop: 15,
    marginBottom: 10,
  },
  signup: {
    // marginTop:10,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    opacity:0.9
  }
});