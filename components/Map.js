import React, { Component } from 'react';
import {
  Container, Header, Title, Content, Footer, FooterTab, Button, Icon,
  Text, List, ListItem,View
} from 'native-base';
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
    Dimensions
} from 'react-native';
export default class Map extends Component {
  constructor() {
      super();
    this.state = {
      Data: [],
      coords:[],
      initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      initialMarker: {
        latitude: 37.78825,
        longitude: -122.4324
      },
      destinationRegion:{}
    }
  }
  componentWillMount(){
    //   console.log(this.props.position)
     this.setState({initialPosition: this.props.position})
     this.setState({initialMarker: this.props.position})
  }
  async getDirections(startLoc, destinationLoc) {
     var init= `${startLoc.latitude},${startLoc.longitude}`;
     var des= `${destinationLoc.latitude},${destinationLoc.longitude}`;
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${init}&destination=${des}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

  render(){
    //   console.log(this.props)
    console.log(this.state.coords)
      return(
          <Container>
                  <Header>
          <Title>Map</Title>
        </Header>
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
            this.setState({destinationRegion:DestinationRegion})
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
    <View style={styles.container}>
    <MapView style={styles.map}
        region={this.state.initialPosition} >
             <MapView.Marker draggable
            coordinate={this.state.initialMarker}
            onDragEnd={(e) => this.setState({ initialMarker: e.nativeEvent.coordinate })}
            />
        
         <MapView.Polyline 
                    key="LTrainPolyline"
                    strokeWidth={5}
                    geodesic={true}
                    coordinates={this.state.coords}
                    strokeColor="rgba(0,0,200,0.5)"
                    lineDashPattern={[47.12]}        
            />
 
    </MapView>
</View >
              <Footer>
          <FooterTab>
            <Button transparent>
            <Text>Tourist Guide</Text>
            </Button>
          </FooterTab>
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
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
        map: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
    }
    });