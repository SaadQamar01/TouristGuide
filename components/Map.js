import React, { Component } from 'react';
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Icon,
    Text, List, ListItem, View, Left, Right, Body, Fab
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Dashboard from './../container/Dashboard.js'
import { BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Polyline from '@mapbox/polyline';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Picker,
    BackAndroid,
    ToastAndroid
} from 'react-native';
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.098
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            Data: [],
            coords: [],
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            initialMarker: {
                latitude: 0,
                longitude: 0
            },
            changingData: {
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            DestinationRegion: {
                latitude: 0,
                longitude: 0,
            }
        }
    }
    componentDidMount() {
        //   console.log(this.props.position)
        this.setState({ initialPosition: this.props.position })
        this.setState({ initialMarker: this.props.position })
    }

    async getDirections(startLoc, destinationLoc) {
        //   this.setState({destinationRegion:destinationLoc})
        var init = `${startLoc.latitude},${startLoc.longitude}`;
        var des = `${destinationLoc.latitude},${destinationLoc.longitude}`;
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${init}&destination=${des}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            return coords
        } catch (error) {
            alert(error)
            return error
        }
    }

    render() {
        return (

            <Container>
                <Content>
                    <GooglePlacesAutocomplete
                        placeholder='Enter Destination Place'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={(row) => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            var DestinationRegion = {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng

                            }
                            this.setState({ DestinationRegion: DestinationRegion })
                            this.getDirections(this.state.initialPosition, DestinationRegion)
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
                                fontWeight: 'bold',
                                zIndex: 16
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                            listView: {
                                color: 'black', //To see where exactly the list is
                                zIndex: 16, //To popover the component outwards
                                backgroundColor: 'white'
                                //   position: 'absolute',  
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
                    <View style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        flex: 1
                    }}>
                        <MapView
                            region={this.state.initialPosition}
                            style={styles.map}
                            showsCompass={true}
                            loadingEnabled={true}
                            showsBuildings={true}
                            provider='google'>

                            <MapView.Marker 
                                coordinate={this.state.initialPosition}
                                title={"title"}
                                >
                            </MapView.Marker>
                            <MapView.Polyline
                                key="LTrainPolyline"
                                strokeWidth={6}
                                strokeColor="#6da0f2"
                                lineCap='round'
                                strokeWidth={5}
                                geodesic={true}
                                coordinates={this.state.coords}
                                // strokeColor="rgba(0,0,200,0.5)"
                                lineDashPattern={[47.12]}
                                />
                            <MapView.Marker draggable
                                coordinate={this.state.DestinationRegion}
                                title={"title"}
                                onDragEnd={(e) => this.setState({ DestinationRegion: e.nativeEvent.coordinate })}
                                />
                        </MapView>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: '#237ece' }}
                            position="topRight"
                            onPress={() => {
                                this.setState({
                                    initialPosition: {
                                        latitude: this.state.initialPosition.latitude,
                                        longitude: this.state.initialPosition.longitude, 
                                        latitudeDelta: LATITUDE_DELTA, 
                                        longitudeDelta: LONGITUDE_DELTA
                                    }
                                })
                            } }
                            >
                            <Icon name="navigate" style={{}} />
                        </Fab>
                    </View>
                </Content>
                <Footer style={{ backgroundColor: '#237ece', color: "#fff" }}>

                </Footer>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 3, 
        // flexDirection: 'row',
        position: 'absolute',
        // padding: 20,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    map: {
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height
    }
});