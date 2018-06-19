import React from "react";
import { StyleSheet,AppRegistry, Image, StatusBar } from "react-native";
import {Header,Right,Left,Body,Button,Title,Icon, Container, Content, Text, List, ListItem } from "native-base";
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';



export default class SideBar extends React.Component {
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

    gotoCreate(){
        this.props.navigation.navigate('Create');
    }
    gotoMain(){
        this.props.navigation.navigate('Main');
    }
    gotoFind(){
        this.props.navigation.navigate('Find');
    }
    gotoProfile(){
        this.props.navigation.navigate('Profile');
    }
  
render() {
    return (
      <Container >
        <Content contentContainerStyle ={style.content} >
            <Header style ={style.header}>
               
                <Left>
                <Button transparent disabled>
                <Icon style={{color:'white'}}  name= 'person'/>
                </Button>
                </Left>
                <Body >
                    <Text style ={style.textLogout}>{firebase.auth().currentUser.email}</Text>
                </Body>
            </Header>
            <List>
                <ListItem icon style={style.list} onPress={this.gotoMain.bind(this)}>
                    <Left>
                    <Icon style={style.icon}  name= 'person'/>
                    </Left>
                    <Body >
                        <Text style ={style.textLogout}>News</Text>
                    </Body>
                </ListItem>
                <ListItem icon style={style.list} onPress={this.gotoCreate.bind(this)}>
                    <Left>
                    <Icon style={style.icon}  name= 'person'/>
                    </Left>
                    <Body >
                        <Text style ={style.textLogout} >Create a Post</Text>
                    </Body>
                </ListItem> 
               
                <ListItem icon onPress={this.gotoProfile.bind(this)}>
                    <Left>
                    <Icon style={style.icon}  name= 'person'/>
                    </Left>
                    <Body >
                        <Text style ={style.textLogout}>Account</Text>
                    </Body>
                </ListItem>
                
                <ListItem icon style={style.list} onPress={this.gotoFind.bind(this)}>
                    <Left>
                    <Icon style={style.icon}  name= 'person'/>
                    </Left>
                    <Body >
                        <Text style ={style.textLogout}>Find a Players</Text>
                    </Body>
                </ListItem>
                <ListItem icon  style={style.list} onPress={this.logOut.bind(this)}>
                    <Left>
                        <Icon style={style.icon} name= 'person'/>
                    </Left>
                    <Body >
                        <Text style ={style.textLogout} >LogOut</Text>
                    </Body>
                </ListItem>
            </List>
            
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
    content: {
        flex :1,
        backgroundColor : '#0C3542',
        
    },
    textLogout :{
        color :"white",
        paddingRight:"20%",
    },
    img : {
        width:"40%",
        height:"40%"
    },
    header :{
        backgroundColor : '#009A9A',
    },
    icon :{
        color:"#B2B2B2"
    }
});
