import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import store from './../store/index.js';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import MiddlewareLogin from './../store/middleWares/middlewareLogin.js';
import SignUp from './SignUp.js'
import * as firebase from 'firebase';
import Dashboard from './Dashboard.js';
import { Container, Header, Content, Form, Item, Input, Label, Button,Spinner } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions
} from 'react-native';
function mapStateToProps(state) {
  return {
    isLogin: state.reducerLogin,
  };
}

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
class Login extends Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: '',
      mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'
    }
  }
  componentWillMount(){
    Dimensions.addEventListener('change',()=> 
    this.setState({mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'}));

    BackHandler.addEventListener('backPress', this.handleBackButton);

  }
    //   componentWillUnmount() {
    //     Dimensions.removeEventListener('change',()=> 
    // this.setState({mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'}));

    // BackHandler.removeEventListener('backPress', false);
    // }
    //     handleBackButton() {
    // try {
    // // alert(Actions.currentRouter.currentRoute);
    //   Actions.home();
    //   return true;
    // } catch (err) {
    // return false;
    //     }
    //  }
    // changeDimensions() {
    //     this.setState({istrue:false})
    //  }
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
      Alert.alert("Please Fill Email & Password")
    }
    else{
    Details={
     Email : userEmail,
     Password : userPassword,
    }
    store.dispatch(MiddlewareLogin.asyncLogin(Details));

    // if(this.props.isLogin==true){
    //   alert()
    //   store.dispatch(MiddlewareLogin.asyncLoginFalse());
    //   Actions.Dashboard();
    // }
    // const auth = firebase.auth();
    // auth.signInWithEmailAndPassword(userEmail, userPassword)
    //   .then(() => {
    //     Actions.Dashboard()
    //   })
    //   .catch((error) => {
    //        alert(JSON.stringify(error.message));
    //     })
    }
  }

  render() {

        // <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
    return (
      // <BackgroundImage>

      // </BackgroundImage>
      <Image source={require('../Images/bg2.jpg')}
        style={styles.backgroundImage}>
        <Container>
        <ScrollView>
           {this.state.mode=='verticle'?     <Image  style={{borderRadius:50,height:120,width:130,top:'14%',left:'33%',zIndex:10}} 
                source={require('../Images/logo.png')} />
           :     <Image  style={{borderRadius:50,height:120,width:130,top:'16%',left:'40%',zIndex:10}} 
                source={require('../Images/logo.png')} />
           }
        <Content style={styles.container}>
          <Form>
            <Item floatingLabel>
              <Label>Email:</Label>
              <Input onChangeText={(Email) => this.setState({ Email })} />
            </Item>
            <Item floatingLabel>
              <Label>Password:</Label>
              <Input secureTextEntry={true} password={true} onChangeText={(Password) => this.setState({ Password })} />
            </Item>
            <Button active info full onPress={this.login.bind(this)} style={styles.login}>
              <Text style={{fontWeight: 'normal',color:'white'}}>Login</Text>
            </Button>
            <Button active info full onPress={() => Actions.SignUp()} style={styles.signup}>
              <Text style={{fontWeight: 'normal',color:'white'}}>Signup</Text>
            </Button>
          </Form>
        </Content>
        </ScrollView>
        </Container>
      </Image>
    );
  }
}

export default connect(mapStateToProps)(Login)
const styles = StyleSheet.create({
  container: {

      // width:300,
    // height:200,
   // position: 'relative',
   top: '-5%',
  //  paddingLeft: '10%',
  //  paddingRight: '10%',
    marginLeft:'7%',
    marginTop:'10%',
    marginRight:'7%',
    // marginBottom:'40%',
   padding: '10%',
    backgroundColor: '#ffffff',
    borderRadius:10,
    opacity: 0.9
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
    borderRadius:10,
    marginTop: 20,
    marginBottom: 10,
  },
  signup: {
    borderRadius:10,
    // marginTop:10,
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    // opacity:0.8
  }
});