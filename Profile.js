

import React, { Component } from "react";
import { StyleSheet , Image } from "react-native";

import { Container, Drawer,Header,View,Title, Left, Icon,Right ,Button,CardItem, Body, Content,Text, Thumbnail,Spinner} from "native-base";
import firebase from 'firebase';
import SideBar from './SideBar';
import { withNavigation } from 'react-navigation';

export default class Profile extends React.Component {
    constructor(){
        super();

        this.state = {
            user : null,
            email : null,
            joined : null,
            seen : null,
           
        };
    }
   

    componentDidMount(){
        //console.log('group/'+this.props.navigation.state.params.group.image+"/"+this.props.navigation.state.params.group.id)
        user = firebase.auth().currentUser;
        var users= firebase.database().ref('users/'+user.uid);
        users.on('value', (snapshot) => {
        var userDB = snapshot.val();
       
        this.setState({
            user: userDB,
            email : user.email,
            joined :(new Date( user.metadata.creationTime)).toLocaleDateString(),
            seen : (new Date( user.metadata.lastSignInTime)).toLocaleDateString()
          
        });
       
        });

    }
    closeDrawer () {
        this.drawer._root.close()
      }
    openDrawer  ()  {
        this.drawer._root.open()
    }
    goToEdit(){
        this.props.navigation.navigate(
            'EditProfile',
            { group : this.props},
          );
        console.log(this.props);
    }
   
  
render() {
    console.log(this.state.user);
    return (

      <Drawer 
        ref ={(ref) =>{this.drawer =ref;}}
        content ={<SideBar navigation ={this.props.navigation}/>}
        onClose ={()=>this.closeDrawer()}>
        <Container style={style.container}>
            <Header style ={style.header}>
                <Left>
                    <Button
                    transparent
                    onPress={()=> this.openDrawer()}>
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title > Profile</Title>
                </Body>
                <Right />
            </Header>
            <Content   style={style.container} padder>
                 { (this.state.user != null && this.state.email !=null && this.state.joined !=null && this.state.seen !=null ) ? 
                <View>
                <CardItem style =  {style.cardStyle}  header button >   
                    <Left style = {{flex :5}}>
                        <Text style ={style.headerText}>{this.state.user.nickname}'s Profile</Text>
                    </Left>
                    <Right style = {{flex :1}}>
                        <View style ={style.viewImage}> 
                        <Thumbnail source={require('./assets/img/logos.png')} />
                    </View>
                    </Right>
                </CardItem> 
                <Text  note>Email :</Text>
                <CardItem style =  {style.cardStyle}  header button >
                        <Text style ={style.text}>{this.state.email}  </Text>
                </CardItem> 
                <Text  note>Nickname :</Text>
                <CardItem style =  {style.cardStyle}  header button >
                        <Text style ={style.text}>{this.state.user.nickname} </Text>
                </CardItem> 
                <Text  note>Joine E-United at :</Text>
                <CardItem style =  {style.cardStyle}  header button >
                        <Text style ={style.text}> {this.state.joined} </Text>
                </CardItem> 
                <Text  note>Last Seen :</Text>
                <CardItem style =  {style.cardStyle}  header button >
                        <Text style ={style.text}> {this.state.seen}</Text>
                </CardItem>
                <Text  note>In Game Nicknames :</Text>

                <CardItem style =  {style.cardStyle}  header button >
                <Text  note>CSGO Nickname :</Text>
                        <Text style ={style.text}> {this.state.user.csgo == null ? 'None' : this.state.user.csgo}</Text>
                </CardItem> 
                
                <CardItem style =  {style.cardStyle}  header button >
                <Text  note>Fortnite Nickname :</Text>
                        <Text style ={style.text}>{this.state.user.fn == null ? 'None' : this.state.user.fn}</Text>
                </CardItem> 
              
                <CardItem style =  {style.cardStyle}  header button >
                <Text  note>PUBG Nickname :</Text>
                        <Text style ={style.text}> {this.state.user.pubg == null ? 'None' : this.state.user.pubg}</Text>
                </CardItem> 
                
                <Button block primary style={style.button} onPress={this.goToEdit.bind(this)}>
                    <Text>EDIT</Text>
                </Button>
                </View>
                : <Spinner/>}
               
            </Content>
        </Container>
      </Drawer>
    );
  } 
}

const style = StyleSheet.create({
    headerText :{
        color :'white',
        fontSize: 20,   
    },
    text:{
        color : 'white'
    },
    viewImage :{
        height :40 ,width :40,alignSelf: 'flex-end',
        marginLeft:10,
        marginRight:10,
        marginBottom :10,
    },
    container :{
       backgroundColor : "#0C3542"
    },
    cardStyle :{
        backgroundColor :"#114A5C"
    },
    header : {
        backgroundColor :'#009A9A',
    },
    button: {
        marginTop :20,
        backgroundColor: '#009A9A',
    },  
    
});
