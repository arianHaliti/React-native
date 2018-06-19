import React from 'react';
import {  StyleSheet,Alert  } from "react-native";
import { NavigationActions } from 'react-navigation'
import {Container,Header,Title,Content, Button,Left,Right,Body,Icon,Text,Spinner,Card,Thumbnail,CardItem,View,Toast} from 'native-base';
import firebase from 'firebase';
import { Image } from 'react-native';
import MemberInfo from './MemberInfo';

export default class GroupInfo extends React.Component {
    constructor(){
        super();
      
        this.state = { 
            group :null,
            data :[],
            leader: null,
        }
    }

    goBack(){
        // console.log("*********************")
        // console.log(this.props)
        // console.log("*********************")
       // console.log(this.props);
        this.props.navigation.goBack()
        
       //this.props.navigation.navigate(this.props.navigation.state.params.group.navigation.state.routeName);
    }
    join(){
    
        //console.log(this.state.data);
        var data = Object.keys(this.state.data);
        //console.log(data);
        user = firebase.auth().currentUser;
        route = 'group/'+this.props.navigation.state.params.group.image+"/"+this.props.navigation.state.params.group.id;
        var del = false;
        data.map((value)=>{
            if(value == user.uid){
                console.log(value + " ************** "+user.uid);
                firebase.database().ref(route).child('members').child(user.uid).set(null);
                del =true;
            }
        });
        //console.log(del)
        if(!del)
            firebase.database().ref(route).child('members').child(user.uid).set('true');
        ///return;
    }
    delete = () => {
       // console.log('group/'+this.state.group.category+'/'+this.state.group.id);
        route = 'group/'+this.state.group.category+'/'+this.state.group.id
        firebase.database().ref(route).set(null);
        this.props.navigation.navigate('Main');

    }
    componentDidMount(){
        //console.log('group/'+this.props.navigation.state.params.group.image+"/"+this.props.navigation.state.params.group.id)
        var CurrentGroups = firebase.database().ref('group/'+this.props.navigation.state.params.group.image+"/"+this.props.navigation.state.params.group.id);
        CurrentGroups.on('value', (snapshot) => {   
        var groupData = snapshot.val();
       // console.log(groupData);
        //console.log(Object.keys(groupData.members)[0]);
        if(groupData !=null){
            fireDB = firebase.database().ref('users');

            var groupLeader = firebase.database().ref('users/'+Object.keys(groupData.members)[0]);
        //  console.log('users/'+Object.keys(groupData.members)[0]);
            fireDB.on('value',(snapshot)=>{
                gleader = snapshot.val();
                
                
                var data = Object.values(gleader);
                
                data.map((value)=>{
                    if(value.email ==groupData.createdBy){
                        console.log(value.email +"  ************  "+groupData.createdBy)  
                        this.setState({
                            leader : value,
                        });
                    }
                })
                

                //console.log(this.state.leader.nickname)
            })
            
        
        this.setState({
            group: groupData,
            data :groupData.members
        });
    }
       // console.log(this.state.data);
        });

      
    }
    checkInGroup(){
        var data = Object.keys(this.state.data);
        user = firebase.auth().currentUser;
        bool = false;
        data.map((value)=>{
           
            if(value == user.uid){
                //console.log(value + ' ----------------------- '+user.uid);
                bool = true;
                
            }
        }); 
        return bool;
    }

    button(){
        user = firebase.auth().currentUser;
        if(user.email == this.state.group.createdBy){
            return (
                <Button block danger style={style.deletebutton} onPress={

                    () => Alert.alert(
                        'Deleting Group !',
                        'Are you sure you want to delete this group',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: this.delete},
                        ],
                        { cancelable: false})
                }>
                    <Text>Delete</Text>
                </Button>
            );
        }else if(this.checkInGroup()){
            return (
                <Button block primary style={style.button} onPress={this.join.bind(this)}>
                    <Text>Leave</Text>
                </Button>
            );
        }
        else if (this.state.group.size == Object.keys(this.state.group.members).length){
            return(
            <Button  disabled block primary style={style.fullbutton} >
                <Text>JOIN</Text>
            </Button>
            );
        }else
        return(
            <Button block primary style={style.button} onPress={this.join.bind(this)}>
            <Text>JOIN</Text>
            </Button>
        );
    }
    render(){
        
        {
        
        if(this.state.group != null){
        color = 1;
         members = Object.keys(this.state.group.members);
         if(this.state.group.category=='csgo'){
            backcolor = "#122238";
            bodycolor = "#192E4C";
            textColor = "#1E475E";
            icon =require('./assets/img/csgo.png');
         }else if(this.state.group.category =='fn'){
            backcolor ="#133633"; 
            bodycolor= "#18423E";
            icon =require('./assets/img/fn.png');
         }else{
            icon =require('./assets/img/pugb.gif');
            backcolor ="#222729"; 
            bodycolor= "#262C2E";
            
         }
        }

        }
        return (
            
            <Container style ={style.content}>
                <Header style ={style.header}>
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
                { 
                this.state.group ==null|| this.state.leader==null ? <Spinner/>:
                <Content>
                    <Card style={{flex: 0,backgroundColor:backcolor}}>
                        <CardItem style={{backgroundColor:backcolor}}>
                            <Left>
                                <Thumbnail source={require('./assets/img/logos.png')} />
                                <Body>
                                    <Text note > Group Leader </Text>
                                    <Text style = {style.textLeader}> {this.state.leader.nickname}</Text>
                                    <Text note>April 15, 2016</Text>
                                </Body>
                            </Left>
                            <Right>
                                <View style ={{height :29 ,width :80}}>
                                    <Image style ={{height :180 ,width:100}} source={icon}/>
                                </View>      
                            </Right>
                        </CardItem>
                        <CardItem style={{backgroundColor:bodycolor}}>
                            <Body>
                                <Text style = {style.title}> {this.state.group.title}</Text>
                                <Text style = {style.text} note >Information about the Group :</Text>
                                <Text style = {style.desc}>{this.state.group.description}</Text>
                                <Text style = {style.players}>Players In the Group:</Text>
                            </Body>
                        </CardItem>
                        {
                            members.map((value)=>{
                            return  <MemberInfo  key ={value} id ={value} backcolor ={backcolor} bodycolor={bodycolor}  />
                            })
                        }
                        <Text style={{backgroundColor:this.props.backcolor}} note> </Text>
                        <CardItem  style={{backgroundColor:bodycolor, marginBottom:10}}>
                            <Right>
                                {this.button()}
                            </Right>
                            <Left>
                                <Text note >Group Status : {members.length == this.state.group.size ? "Full":"Searching"}{"\n"}
                                    Group size : {members.length}/{this.state.group.size}
                                </Text>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
                }
            </Container>
        );
    }
}

const style = StyleSheet.create({
    content: {
        backgroundColor : '#0C3542',
    },
    header : {
        backgroundColor :'#009A9A',
    },
    text : {
        color :"white",
    },
    title :{
        color:'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom : 10,
    },
    cardItem :{
        marginLeft :10 ,
        marginRight :10
    },
    desc :{
        color :"white",
        fontWeight: 'bold',
        marginBottom : 10,
        marginTop: 10,
        fontSize: 14,
        
    },
    players:{
        color:'white',
        marginTop:10,   
    },
    button: {
        width :80,
        backgroundColor: '#009A9A',
    },
    textLeader:{
        color:'white',
        fontSize: 20,
    },
    fullbutton: {
        width :80,
        backgroundColor: 'grey',
    },
    deletebutton: {
        width :82,
    },
})