import React, { Component } from 'react';
import { Item, Input, Icon, Button, Text, View } from 'native-base';
import { Container, Header,Title, Content, Card, CardItem, Body } from 'native-base';
import MapView from 'react-native-maps';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      Data: {},
      initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      initialMarker: {
        latitude: 37.78825,
        longitude: -122.4324
      }
    }
  }
  componentWillMount() {
    console.log(this.props.data);
    this.setState({Data: this.props.data});
     var initialRegion = {
      latitude: this.props.data.geometry.location.lat,
      longitude: this.props.data.geometry.location.lng,
      latitudeDelta: LATTITUDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    }
        var initialMarker = {
      latitude: this.props.data.geometry.location.lat,
      longitude:this.props.data.geometry.location.lng
    }
        this.setState({initialPosition:initialRegion });
        this.setState({initialMarker:initialMarker });
  }
  render() {
    console.log(this.state)
    var newData = this.state.Data
    var icon = newData.icon;
    var name = newData.name;
    var rating = newData.rating;
    var address = newData.formatted_address;
    return (
      // <Text>Details</Text>
      <Container style={{ padding:20 }}>
         <Header>
          <Title>Details</Title>
        </Header>
        <Content style={{marginBottom:10}}>
          <Card>
            <CardItem header style={{ justifyContent: 'center' }}>
              <Image
                style={{ width: 50, height: 50}}
                source={{ uri: `${icon}` }} />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Name:  {name}
                </Text>
                <Text>
                  Rating:  {rating}
                </Text>
                <Text>
                  Address:  {address}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'center' }}>
              <Text>Tourist Guide</Text>
            </CardItem>
          </Card>
        </Content>
        <Header>
          <Title>Map of {name}</Title>
        </Header>
        <View style={styles.container}>
          <MapView style={styles.map}
            region={this.state.initialPosition} >
          <MapView.Marker draggable
              coordinate={this.state.initialMarker}
              onDragEnd={(e) => this.setState({ initialMarker: e.nativeEvent.coordinate })}
              />
          </MapView>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 3, 
    // flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F5FCFF',
    // position: 'absolute',
    // padding: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height :300,
    width:320,
    position: 'absolute',
    // padding: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});