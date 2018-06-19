

import React, { Component } from "react";
import {  StyleSheet  } from "react-native";
import { Container, Drawer,Header,Title, Left, Icon,Right ,Button, Body, Content,Tabs,Tab,ScrollableTab,Spinner} from "native-base";
import firebase from 'firebase';
import SideBar from './SideBar';
import GroupListItem from './GroupListItem';

export default class FindPlayer extends React.Component {
    constructor(){
        super();

        this.state = { 
            groups :[]
        }
    }
    closeDrawer () {
        this.drawer._root.close()
      }
    openDrawer  ()  {
        this.drawer._root.open()
    }
    componentDidMount(){
        var CurrentGroups = firebase.database().ref('group');
        CurrentGroups.on('value', (snapshot) => {
        var groupData = snapshot.val();
        if(groupData !=null)
            var grouplist = Object.values(groupData);
        else 
            grouplist =[];
        this.setState({
          groups: grouplist,
        });
       
        
        });
    }
  
   
render() {
   
    return (

        <Drawer 
            ref ={(ref) =>{this.drawer =ref;}}
            content ={<SideBar navigation ={this.props.navigation}/>}
            onClose ={()=>this.closeDrawer()}>
            <Container style ={style.content}>
                <Header style ={style.header}>
                    <Left>
                        <Button
                            transparent
                            onPress={()=> this.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title >Find Players</Title> 
                    </Body>
                    <Right />
                </Header>
                    
                    {
                        this.state.groups.length != 0 ?
                    
                    <Tabs renderTabBar={()=> <ScrollableTab style ={style.content}/>}>
                        {  
                            
                            this.state.groups.map((value)=>{
                                
                                user = firebase.auth().currentUser;
                                var val =Object.values(value)
                                
                                if(val[0].category=='csgo'){
                                    head= "CSGO"

                                }
                                else if (val[0].category =='fn'){
                                    head= 'Fortnite'
                                }
                                else {
                                    head = 'PUBG'
                                }
                                return ( 
                                    <Tab key ={val}style ={style.content} heading={head} activeTabStyle={{backgroundColor: '#009A9A'}} tabStyle={{backgroundColor: '#0C3542'}}>
                                        <Content  contentContainerStyle={style.content} >
                                            {
                                                val.map((value)=>{
                                                    //console.log(value.category)
                                                    return (
                                                        <GroupListItem key={value.id} id={value.id} title ={value.title} image={value.category} description={value.description} size ={value.size} members ={value.members} createdBy ={value.createdBy}/>
                                                    )
                                                })
                                            }

                                        </Content>
                                    </Tab>
                                );
                            })
                            
                        }
                    </Tabs>
                    :    <Spinner/>
                }
            </Container>
        </Drawer>
    );
  } 
}

const style = StyleSheet.create({
    loginButton: {
        marginTop: 20,
        width: "35%",
        alignSelf: "flex-end",
        backgroundColor: '#009A9A',
    },
    creatText: {
        color :"white",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        backgroundColor : '#0C3542',
    },
    header :{
        backgroundColor: '#009A9A',

    },
    textarea : {
        borderColor:"#009A9A",
        color : "white",
        width:"79%"

    },
    bigtextarea: {
        
        borderColor:"white",
        color : "white",
        marginLeft:15,
        marginTop :10,
        width:"80%"
    },
    labelInput :{
        color :"#B2B2B2"
    },
    item:{
      
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%"
    },
    
});
