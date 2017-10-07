import React, { Component } from "react";
// import { Image } from 'react-native';
import { Container, Header, View, Button, Content, ActionSheet, Text, Footer, Badge, Icon, Card, CardItem, Body, Right, DeckSwiper, Thumbnail } from "native-base";
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
// import { connect } from 'react-redux';
import store from './../store/index.js';
import SignUp from './SignUp.js'
import Login from './Login.js';
import Places from './placeList.js';
import Details from './../components/Details.js';
import Map from './../components/Map.js';
import Dashboard from './Dashboard.js'
import Middleware from '../store/middleWares/touristMW.js';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
//   function mapStateToProps(state) {
//     return {
//         patientsData: state.patientsData,
//     };
// }
// function mapDispatchToProps(dispatch){
//   return {
//         patientDetail: (data) => dispatch( PatientMiddleware.asyncAddPatient(data)),
//         loadPatients:() => {
//           dispatch( PatientMiddleware.asyncLoadPatient())  
//         }
//         ,
//         deleteAllPatients: () => dispatch( PatientMiddleware.asyncDeleteAllPatient()),
//         deletePatient: (index) => dispatch( PatientMiddleware.asyncDeletePatient(index)),
//   }
// }

export default class App extends Component {

  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    //         store.subscribe(() =>
    //   console.log(store.getState())
    // )
    return (
      // <View><Text>hello</Text></View>
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="Login"
              // renderTitle={() => (
              //   <View>
              //     <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
              //   </View>
              // )}
              // renderBackButton={() => (null)}
              // navigationBarStyle={styles.header}
              component={Login}
              // title="Tourist Guide"
              hideNavBar
              initial
              />
            <Scene
              key="SignUp"
              // renderTitle={() => (
              //   <View>
              //     <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
              //   </View>
              // )}
              hideNavBar
              // renderBackButton={()=>(null)}
              component={SignUp}
              />
            <Scene
              key="Dashboard"
              component={Dashboard}
              // title="Tourist Guide"
              hideNavBar
              // initial
              />
            <Scene
              key="Places"
              component={Places}
              // title="Tourist Guide"
              hideNavBar
              // initial
              />
            <Scene
              key="Details"
              component={Details}
              // title="Tourist Guide"
              hideNavBar
              // initial
              />
            <Scene
              key="Map"
              component={Map}
              // title="Tourist Guide"
              hideNavBar
              // initial
              />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = {
  // header: {
  //   backgroundColor: 'lightgrey',
  //   padding: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   height: 64,
  // },
  headerLogo: {
    // height: 50,
    // width: 900,
    flex: 1,
    width: 360,
    height: 100,
    resizeMode: 'stretch'
  },
};
// export default connect(mapStateToProps,mapDispatchToProps)(App)


