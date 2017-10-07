import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import {
    Container, Header, Content, Card, CardItem, Footer, FooterTab, Thumbnail, Title, Right, Icon, Body, Left
} from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as firebase from 'firebase';
import Map from './../components/Map.js';
// import store from './../store/index.js';
import Places from './placeList.js';
// import { connect } from 'react-redux';
// import { BackHandler } from 'react-native';
import MapView from 'react-native-maps';
// import {navigator} from 'react-native'
import axios from 'axios';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {
    AsyncStorage,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Button,
    Image,
    Dimensions, Picker,
    BackAndroid,
    ToastAndroid,
    Alert
} from 'react-native';
import {
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
const windowSize = require('Dimensions').get('window')
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;
var name = "Searching.....";
var checkBackButton=true;
// var lat;
// var long;
export default class Dashboard extends Component {
    constructor() {
        // alert('constructor');
        super();
        this.state = {
            search: '',
            placeName: 'Searching.....',
            placeID: '',
            data: [],
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA,
            },
            initialMarker: {
                latitude: 0,
                longitude: 0
            }
        }

    }
    // getInitialState() {
    //     return {
    //         region: {
    //             latitude: 37.78825,
    //             longitude: -122.4324,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         },
    //     };
    // }

    // onRegionChange(region) {
    //     this.setState({ region });
    // }
    // watchID: ?number=null
    componentDidMount() {
        // alert('componentDidMount')
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position)
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            }
            // alert('componentDidMount1')
            // var previousPosition = {};
            // AsyncStorage.setItem('initialPosition', JSON.stringify(initialRegion), () => {
            //     AsyncStorage.getItem('initialPosition', (err, result) => {
            //         previousPosition = JSON.parse(result)
            //         alert(JSON.stringify(previousPosition))
            //     });
            // });
            this.setState({ initialPosition: initialRegion })
            this.setState({ initialMarker: initialRegion })
            // }, (error) => alert(JSON.stringify(error)),
            var placeID = "";
            let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`;
            axios.get(url).then(({data}) => {
                // alert(data.results[0].name)
                // console.log(data.results)
                // alert(JSON.stringify(data.results[1].name))
                // alert('componentDidMount2')
                // alert(`${data.results[1].name}`)
                name = `${data.results[1].name}`;
                this.setState({
                    placeName: `${data.results[1].name}`,
                })
                this.setState({
                    placeID: `${data.results[0].place_id},${data.results[1].place_id}`
                })
            })
        }, (error) => Alert.alert('No Internet Access'),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
        this.watchID = navigator.geolocation.watchPosition((position) => {
           var  lat = parseFloat(position.coords.latitude)
           var long = parseFloat(position.coords.longitude)
            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            }
            // alert('componentDidMount2')
            this.setState({ initialPosition: lastRegion })
            this.setState({ initialMarker: lastRegion })
            // console.log(`${lat}`, long)
        })
    }
    // searchDestination=async()=>{
    //     const response=await fetch('')
    //     const json =await response.json();
    //     this.setState({data:json.result})
    // }
    restaurantData() {
          if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
        let location = `${this.state.initialPosition.latitude},${this.state.initialPosition.longitude}`
        // console.log(location)
        var check = false
        let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=restaurant&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
        axios.get(uri).then(({data}) => {Actions.Places(data.results)})
            .catch((error) => {
                 if (error.response) {
                    Alert.alert(error.response.data);
    }
            ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);
                // Alert.alert('No Internet Access')
            })
        
    }
    }
    funData() {
          if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
        let location = `${this.state.initialPosition.latitude},${this.state.initialPosition.longitude}`
        // console.log(location)
        var check = false
        let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=park&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
        axios.get(uri).then(({data}) => {Actions.Places(data.results)})
            .catch((error) => {
                 if (error.response) {
                    Alert.alert(error.response.data);
    }
        ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);
                // Alert.alert('No Internet Access')
            })
        }
    }
    hospitalData() {
          if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
        let location = `${this.state.initialPosition.latitude},${this.state.initialPosition.longitude}`
        // console.log(location)
        var check = false
        let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=hospital&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
         axios.get(uri).then(({data}) => {Actions.Places(data.results)})
            .catch((error) => {
                 if (error.response) {
                    Alert.alert(error.response.data);
    }
                // Alert.alert('No Internet Access')
                ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);
            })
        }
    }
    hotelData() {
          if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
        let location = `${this.state.initialPosition.latitude},${this.state.initialPosition.longitude}`
        // console.log(location)
        var check = false
        let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=establishment&keyword=hotel&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
        axios.get(uri).then(({data}) => {Actions.Places(data.results)})
            .catch((error) => {
                 if (error.response) {
                    Alert.alert(error.response.data);
    }
                // Alert.alert('No Internet Access')
            ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);
            })
        }
    }
    mallsData() {
          if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
        let location = `${this.state.initialPosition.latitude},${this.state.initialPosition.longitude}`
        // console.log(location)
        var check = false
        let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=shopping_mall&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
        axios.get(uri).then(({data}) => {Actions.Places(data.results)})
            .catch((error) => {
                 if (error.response) {
                    Alert.alert(error.response.data);
    }
                // Alert.alert('No Internet Access')
            ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);            })
        }
    }
    bankData() {
          if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
        let location = `${this.state.initialPosition.latitude},${this.state.initialPosition.longitude}`
        // console.log(location)
        var check = false
        let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=bank&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
          axios.get(uri).then(({data}) => {Actions.Places(data.results)})
            .catch((error) => {
                 if (error.response) {
                    Alert.alert(error.response.data);
    }
                // Alert.alert('No Internet Access')
                ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);
            })
    }
    }
    logout() {
        firebase.auth().signOut()
        Actions.Login()
        name = "Searching.....";
    }

    componentWillMount() {
        BackHandler.addEventListener('backPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backPress', false);
    }
    handleBackButton() {
    try {
    // alert(Actions.currentRouter.currentRoute);
    if(Actions.currentScene === 'Dashboard'||Actions.currentScene === 'Places'||Actions.currentScene === 'Map') {
      Actions.Dashboard();
      return true;
    }
    else if(Actions.currentScene === 'Login'){
        Actions.Login();
      return true;
    }
    } catch (err) {
    return false;
        }
     }
     myMap=()=>{
        if(this.state.initialPosition.latitude===0){
            Alert.alert('No Internet Access')
        }
        else{
            Actions.Map({ position: this.state.initialPosition })
        }
}
    render() {
        // alert(name)
        // <Image style={styles.headerLogo} source={require('../Images/bar.png')}/>
        // <Icon name="menu" style={{ color: "#fff" }} />
        return (
            <Image source={require('../Images/bgd.jpg')}
                style={styles.backgroundImage}>
                <Header style={{ backgroundColor: '#237ece', color: "#fff" }}>
                    <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Title>Tourist Guide</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Log out</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Container>
                    <Content>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={(row) => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                // alert(JSON.stringify(data))
                                this.setState({ placeName: details.name });
                                name = details.name;
                                var initialRegion = {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: LATTITUDE_DELTA,
                                    longitudeDelta: LONGTITUDE_DELTA
                                }
                                var initialMarker = {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                }
                                this.setState({ initialPosition: initialRegion });
                                this.setState({ initialMarker: initialMarker });

                                Actions.Map({ position: this.state.initialPosition })
                                console.log(data);
                                console.log(details);
                            } }
                            getDefaultValue={() => {
                                return ''; // text input default value
                            } }
                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI',
                                language: 'en', // language of the results
                                // types: '(cities)' // default: 'geocode'
                            }}
                            styles={{
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                },
                                listView: {
                                    // position: 'absolute', 
                                    height: deviceHeight,
                                    width: deviceWidth,
                                    color: 'black', //To see where exactly the list is
                                    zIndex: 50, //To popover the component outwards
                                    backgroundColor: 'white'
                                }
                            }}


                            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{
                                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                // types: 'food'
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            // predefinedPlaces={[homePlace, workPlace]}

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                            // renderRightButton={() => <Text>Custom text after the inputg</Text>}
                            />
                        <View style={{ marginTop: '25%' }}>
                            <View style={styles.container1}>
                                <Card style={styles.card} >
                                    <TouchableOpacity onPress={() => this.restaurantData()}>
                                        <View style={styles.card_view} >
                                            <Image
                                                style={styles.card_image}
                                                source={require('../Images/restaurant.png')} />
                                            <Text style={styles.card_text}>
                                                Restaurant
                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                                <Card flexDirection='column' style={styles.card}>
                                    <TouchableOpacity onPress={() => this.funData()}>
                                        <View style={styles.card_view}>
                                            <Image
                                                style={styles.card_image}
                                                source={require('../Images/park.jpg')} />
                                            <Text style={styles.card_text}>
                                                Park
                                </Text>
                                        </View>
                                    </TouchableOpacity >
                                </Card>
                                <Card flexDirection='column' style={styles.card}>
                                    <TouchableOpacity onPress={() => this.hospitalData()}>
                                        <View style={styles.card_view}>
                                            <Image
                                                style={styles.card_image}
                                                source={require('../Images/hospital.png')} />
                                            <Text style={styles.text}>
                                                Hospital
                                </Text>
                                        </View>
                                    </TouchableOpacity >
                                </Card>
                            </View>
                            <View style={styles.container2}>
                                <Card flexDirection='column' style={styles.card}>
                                    <TouchableOpacity onPress={() => this.hotelData()}>
                                        <View style={styles.card_view}>
                                            <Image
                                                style={styles.card_image}
                                                source={require('../Images/hotel.jpg')} />
                                            <Text style={styles.card_text}>
                                                Hotel
                                </Text>
                                        </View>
                                    </TouchableOpacity >
                                </Card>
                                <Card flexDirection='column' style={styles.card}>
                                    <TouchableOpacity onPress={() => this.mallsData()}>
                                        <View style={styles.card_view}>
                                            <Image
                                                style={styles.card_image}
                                                source={require('../Images/mall.jpg')} />
                                            <Text style={styles.card_text}>
                                                Shoping Mall
                                </Text>
                                        </View>
                                    </TouchableOpacity >
                                </Card>
                                <Card flexDirection='column' style={styles.card}>
                                    <TouchableOpacity onPress={() => this.bankData()}>
                                        <View style={styles.card_view}>
                                            <Image
                                                style={styles.card_image}
                                                source={require('../Images/bank.png')} />
                                            <Text style={styles.card_text}>
                                                Bank
                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.myMap()}
                                    style={styles.place_name}>
                                    <Text>{name}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                    <Footer style={{ backgroundColor: '#237ece', color: "#fff" }}>

                    </Footer>
                </Container>
            </Image >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 6, 
        // flexDirection: 'row',
    },
    container1: {
        flex: 3,
        flexDirection: 'row',
        // position: 'absolute',
        // top: 200,
        paddingLeft: 20,
        paddingRight: 20,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    container2: {
        flex: 3,
        flexDirection: 'row',
        // position: 'absolute',
        // top: 310,
        paddingLeft: 20,
        paddingRight: 20,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    card: {
        width: 130, height: 100, alignItems: 'center', justifyContent: 'center'
    },
    card_view: {
        alignItems: 'center', justifyContent: 'center'
    },
    card_image: {
        width: 70, height: 70, marginTop: 5, alignItems: 'center', justifyContent: 'center'
    },
    card_text: {
        fontWeight: 'bold', marginBottom: 5
    },
    place_name: {
        backgroundColor: 'white', padding: 20, marginTop: '10%', borderRadius: 30
    },
    logout: {
        // backgroundColor: '#1f91dd',
        padding: 20, width: '100%', height: 60
    },
    headerLogo: {
        // height: 50,
        // width: 900,
        // flex: 1,
        width: '100%',
        height: 60,
        resizeMode: 'stretch'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    title: {
        // fontSize: 38,
        backgroundColor: 'transparent'
    },
    button: {
        marginRight: 10
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'stretch'
    }
});
// export default connect(mapStateToProps)(PatientData)