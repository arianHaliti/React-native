

import React, { Component } from "react";
import { StatusBar, StyleSheet} from "react-native";
import { Container, Drawer,Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import firebase from 'firebase';
import SideBar from './SideBar';
import { withNavigation } from 'react-navigation';

export default class HomeScreen extends React.Component {
    
    closeDrawer () {
        this.drawer._root.close()
      }
    openDrawer  ()  {
        this.drawer._root.open()
    }
    logOut() {
        console.log("****************"+this.props.navigation+"*********");
        firebase.auth().signOut()
        .then(this.goToLogin, function(error) { 
            console.error('Sign Out Error', error); 
        });
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }  
  
  
render() {
    return (

      <Drawer 
        ref ={(ref) =>{this.drawer =ref;}}
        content ={<SideBar navigation ={this.props.navigation}/>}
        onClose ={()=>this.closeDrawer()}>
        <Container>
            <Header style ={style.header}>
            <Left>
                <Button
                transparent
                onPress={()=> this.openDrawer()}>
                <Icon name="menu" />
                </Button>
            </Left>
            <Body>
                <Title>News</Title>
            </Body>
            <Right />
            </Header>
            <Content  contentContainerStyle={style.content} padder>
            
            <Button full rounded dark
                style={{ marginTop: 10 }}
                onPress ={this.logOut.bind(this)}
                >
                <Text>Log out</Text>
            </Button>
            <Button full rounded primary
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("Profile")}>
                <Text>Goto Profiles</Text>
            </Button>
            </Content>
        </Container>
      </Drawer>
    );
  }
}

const style = StyleSheet.create({
    content: {
        flex :1,
        backgroundColor : '#0C3542',
    },
    header :{
        backgroundColor: '#009A9A',

    },
    loginButton: {
        marginTop: 40,
        marginBottom: 20,
        width: "70%",
        alignSelf: "center",
        backgroundColor: '#009A9A',
    },
    signUpText: {
        fontSize:12,
        alignSelf: "center",
        color: '#B2B2B2',
    },
    signUpTextlink :{
        fontSize:12,
        alignSelf: "center",
        color: '#009A9A',
        fontWeight : 'bold',
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    textInput :{
        color :'white',
    },
    labelInput :{
        color:'#B2B2B2',
    }
});
