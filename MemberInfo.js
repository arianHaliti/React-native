import React, {Component} from 'react';
import {  StyleSheet  } from "react-native";
import {Container,Header,Title,Content, Footer,FooterTab, Button,Left,Right,Body,Icon,Text,Spinner,Card,Thumbnail,CardItem,View} from 'native-base';
import Config from './Config';
import firebase from 'firebase';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';
class MemberInfo extends React.Component {
    constructor(){
        super();

        this.state = { 
            member :null
        }
    }

    componentDidMount(){
        // console.log('users/'+id);
        var groupUser= firebase.database().ref('users/'+this.props.id);
        groupUser.on('value', (snapshot) => {
            var groupData = snapshot.val();
           // console.log((groupData));
            //return groupData;
            this.setState({
                member: groupData,
            });
        //console.log(this.state.group)
        
        });
        
    }
    render(){
      
        //console.log(this.state.member);
        if(this.state.member== null){
            return <Spinner/>
        }
        
       return(
            <View>
                <Text style={{backgroundColor:this.props.backcolor}} note>Member :1 </Text>
                <CardItem  style={{backgroundColor:this.props.bodycolor}}>

                    <Left style={{backgroundColor:this.props.bodycolor}}>
                        <Thumbnail square small source={require('./assets/img/logos.png')} />
                        <Body>
                            <Text style ={{color:'white',fontSize: 20, fontWeight: 'bold',}}>{this.state.member.nickname}</Text>
                            <Text note>ID : Lazloow</Text>
                        </Body>
                    </Left>
                </CardItem >
            </View>
       );
    }
}

export default withNavigation(MemberInfo);