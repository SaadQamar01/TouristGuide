import React, { Component } from 'react';
import store from './../store/index.js';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import Middleware from './../store/middleWares/touristMW.js';
import { Actions } from 'react-native-router-flux';
import Login from './Login';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TextInput,
  Image
} from 'react-native';
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      Email: '',
      Password: '',
    }
  }

  submit() {
    var Name = this.state.Name;
    var Email = this.state.Email;
    var Password = this.state.Password;
    if(Name==''||Email==''||Password==""){
      alert("Please fill all requirements")
    }
    else{
      
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(Email, Password).catch(function (error) { alert(error) })
      .then(data => {
        firebase.auth().currentUser.updateProfile({
          displayName: Name
        })
        // var rootRef = firebase.database().ref();
        // const speedRef = rootRef.child("users" + "/" + firebase.auth().currentUser.uid).set({
        //   email: userEmail,
        //   password: userPass,
        //   name: this.refs.name.value,
        // })
        alert('Signup Successfully')
        Actions.Login()
      })
    }
    // store.dispatch(Middleware.asyncSignUp(Details));
  }
  render() {


    return (
      <Image source={require('../Images/bg.jpg')}
        style={styles.backgroundImage}>
        <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
        <Content style={styles.container}>
          <Form>
            <Item floatingLabel>
              <Label>Name:</Label>
              <Input onChangeText={(Name) => this.setState({ Name })} />
            </Item>
            <Item floatingLabel>
              <Label>Email:</Label>
              <Input onChangeText={(Email) => this.setState({ Email })} />
            </Item>
            <Item floatingLabel >
              <Label>Password:</Label>
              <Input onChangeText={(Password) => this.setState({ Password })} />
            </Item>
            <Button active info full onPress={this.submit.bind(this)} style={styles.submit}>
              <Text>SUBMIT</Text>
            </Button>
            <Button active info full onPress={() => Actions.Login({})} style={styles.back}>
              <Text>Back</Text>
            </Button>
          </Form>
        </Content>
      </Image>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // width:300,
    // height:200,
    position:'relative',
    top: -30,
    padding: 40,
    // backgroundColor: 'lightgrey'
  },
  headerLogo: {
    // height: 50,
    // width: 900,
    // flex: 1,
    width: '100%',
    height: 60,
    resizeMode: 'stretch'
  },
  submit: {
    marginTop: 15,
    marginBottom: 10,
  },
  back: {
    // marginTop:10,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch'
  }
});