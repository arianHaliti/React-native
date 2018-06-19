

import React, { Component } from "react";
import { StyleSheet , Image } from "react-native";
import { NavigationActions } from 'react-navigation'
import { Container, Drawer,Header,View,Title, Left, Icon,Right ,Button,CardItem, Body, Content,Text, Thumbnail,Spinner} from "native-base";
import firebase from 'firebase';
import SideBar from './SideBar';
import { withNavigation } from 'react-navigation';

export default class Profile extends React.Component {
 

    goBack(){
        this.props.navigation.goBack()
          // this.props.navigation.navigate(this.props.navigation.state.params.group.navigation.state.routeName);
        }
render() {
    
    return (

        <Container >
            <Header >
                    <Left>
                        <Button transparent >
                            <Icon name ='arrow-back' onPress={this.goBack.bind(this)}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Group Detail </Title>
                    </Body>
                    <Right />
                </Header>
           
        </Container>
     
    );
  } 
}
