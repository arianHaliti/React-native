
import React, { Component } from 'react';
import { Image ,Dimensions } from 'react-native';
import { Container, Header, View,Content, Card, Button, CardItem, Text, Body } from 'native-base';
import Config from './Config';
import { withNavigation } from 'react-navigation';

class GroupListItem extends React.Component {
    constructor(){
        super();

        this.state = {
          
            screen :Dimensions.get('window')
        };
    
    }
    goToDetail(){
       
        this.props.navigation.navigate(
            'GroupInfo',
            { group : this.props},
          );
        
    }
   
    getOrientation(){
        if (this.state.screen.width > this.state.screen.height) {
          return 'LANDSCAPE';
        }else {
          return 'PORTRAIT';
        }
    }
    getTitle(title){

        if (this.getOrientation() === 'PORTRAIT') {
            if(title.length <=21){
                return title
            }
            return title.substring(0, 21)+" ...";
        }else{
            if(title.length <=38){
                return title
            }
            return title.substring(0, 38)+" ...";
        }
    }
    onLayout(){
        this.setState({screen: Dimensions.get('window')});
    }
    render(){
//         console.log("********* GROULISTITEM *************")
// console.log(this.props)
// console.log("********* GROULISTITEM *************")
        //console.log("************"+this.props.members.length+"****************"+this.props.title);
        var icon;
        var backcolor;
        if(this.props.image =="csgo"){
            icon =require('./assets/img/csgo.png');
            backcolor = "#122238";
            bodycolor = "#192E4C";
            tag="CSGO";
        }else if(this.props.image=='fn'){
            icon =require('./assets/img/fn.png');
            backcolor ="#133633"; 
            bodycolor= "#18423E";
            tag = "Fortnite";
        }
        else{
            icon =require('./assets/img/pubg.gif');
            backcolor ="#222729"; 
            bodycolor= "#262C2E";
            tag = "PUBG";
        }
       
        
       
        return(
            <Card  style={{backgroundColor:bodycolor}} onLayout = {this.onLayout.bind(this)} >
                <CardItem  style={{backgroundColor:backcolor}} header button onPress={this.goToDetail.bind(this)} >
                    <View>
                    <Text   style ={{fontSize :20,color:"white"}}>{this.getTitle(this.props.title)}</Text>
                    </View>
                    <View style ={{height :40 ,width :40,alignSelf: 'flex-end'}}>
                        <Image style ={{height :190 ,width :160}} source={icon}/>
                    </View>
                </CardItem> 
                <CardItem cardBody button style={{backgroundColor:bodycolor}}>
                    <Body>
                        <Text style ={{fontSize :13,color:"white",paddingLeft:10}}>
                            {this.props.description}
                        </Text>
                        <Text style ={{fontSize:14,color:"white",marginTop:20,paddingLeft:10}}>
                            Group size {Object.keys(this.props.members).length} / {this.props.size} 
                        </Text>
                        <View style ={{alignSelf: 'flex-end',borderWidth: 1, backgroundColor:"#0C3542",marginRight : 10}}  >
                            <Text style={{color:"white"}}>
                                {tag}
                            </Text>
                        </View>
                        <Button block primary style={style.loginButton} onPress={this.goToDetail.bind(this)}>
                            <Text>More Info</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

export default withNavigation(GroupListItem);

const style = {
    loginButton: {
        margin:10,
        width: "30%",
        alignSelf: "flex-end",
        backgroundColor: '#009A9A',
    },
}