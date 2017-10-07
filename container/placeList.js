import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Details from './../components/Details.js'
import {
  Container, Header, Title, Content, Footer, FooterTab, Button, Icon,
  Text, List, ListItem,Left,Body,Thumbnail,Image,Right
} from 'native-base';
import axios from 'axios';
import Dashboard from './Dashboard.js'
export default class Places extends Component {
  constructor() {
    super();
    this.state = {
      Data:[]
    }
  }
  placeDetail(placeId) {
    console.log(placeId)
    let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
    axios.get(url).then(({data}) => {
      console.log(data.result);
        Actions.Details({data:data.result});
    })
  }
  componentWillMount(){
        // var allData = [];
        console.log(this.props.data)
      this.setState({Data: this.props.data})

  // this.setState({Data: this.props.data})
  }
          // <button onPress={()=> Actions.Dashboard()}><Text>Back</Text></button>
  render() {
    return (
            <Container>
        <Header>
        
          <Title>{this.state.Data[0].types[0]} List</Title>
        </Header>
      <Content>
        <List
          dataArray={this.state.Data}
          renderRow={(d) =>
            <ListItem button onPress={()=>this.placeDetail(d.place_id)}>
              <Text>{d.name}</Text>
            </ListItem>
          }>
        </List>
      </Content>
              <Footer>
          <FooterTab>
            <Button transparent>
              <Icon name='ios-call' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}