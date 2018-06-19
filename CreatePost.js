

import React, { Component } from "react";
import { StatusBar,Picker, StyleSheet ,Dimensions, KeyboardAvoidingView ,Alert} from "react-native";
import { Container, Drawer,Header,View, Label,Title,Form, Textarea, Left, Icon, Item,Right,Input ,Button, Body, Content,Text, } from "native-base";
import firebase from 'firebase';
import SideBar from './SideBar';
import { withNavigation } from 'react-navigation';

export default class HomeScreen extends React.Component {
    constructor(){
        super();

        this.state = {
            title: '',
            desc: '',
            number: '',
            game : 'csgo',
            region: 'na',
            screen :Dimensions.get('window')
        };
    
    }
    //Nese Widtn > High e qet ne LandScape mod
    getOrientation(){
        if (this.state.screen.width > this.state.screen.height) {
          return 'LANDSCAPE';
        }else {
          return 'PORTRAIT';
        }
    }
    //I Jep Styles te caktum per landscape apo portrait mod
    getStyle(){
        if (this.getOrientation() === 'LANDSCAPE') {
            //console.log('LandStyle')

            return landStyle;
        } else {
           // console.log('Style')
            
            return style;
        }
    }
    //Ndrron screen state dimenzionet dimensionet e
    onLayout(){
        this.setState({screen: Dimensions.get('window')});
    }
   
    onTitleChanged(val) {
        //console.log(val);
        this.setState({
            title: val
        });
    }

    onDescriptionChanged(val) {
       // console.log(val);
        //console.log(this.state.game);
        this.setState({
            desc: val
        });
    }

    onNumberChanged(val) {
        //console.log(val);
        this.setState({
            number: val
        });
    }

   
    closeDrawer () {
        this.drawer._root.close()
      }
    openDrawer  ()  {
        this.drawer._root.open()
    }
    validation(){

        if(this.state.title.length > 75){
            Alert.alert("Error", "Your Title is to long !");
            return false;
        }
        if(this.state.desc.length > 200){
            Alert.alert("Error", "Your Description is to long !");
            return false;
        }
        if(this.state.number.match(/^[0-9]+$/) == null){
            Alert.alert("Error", "Number of players should be a number !");
            return false;
        }else if (this.state.number >10 || this.state.number <2){
            Alert.alert("Error", "Number of players should be between 2 and 10 !");
            return false;
        }
        return true;
    }

    
    onSubmitPressed() {
        if (this.state.title.trim() == '') {
            Alert.alert("Error", "You must enter a Title!");
            return;
        }

        if (this.state.desc.trim() == '') {
            Alert.alert("Error", "You must enter a Description!");
            return;
        }

        if (this.state.number.trim() == '') {
            Alert.alert("Error", "You must enter a Number!");
            return;
        }
        bool =this.validation();
        if(!bool)
            return;
        user = firebase.auth().currentUser;
       // console.log(user.email);
        email = user.email
        var member ={};
        member[user.uid] = 'true';
        var rootRef = firebase.database().ref('group/'+this.state.game); // Empty parameters == root reference

        var newNode = rootRef.push({
            category:this.state.game,
            createdBy : user.email,
            region : this.state.region,
            description : this.state.desc,
            active : 0,
            members :member,
            size : this.state.number,
            title : this.state.title
        }, () => {
            // Ky funksion thirret kur push kryhet me sukses
            newNode.update({
                id:newNode.getKey()
            })
            Alert.alert("User successfully inserted! User ID is " + newNode.getKey());

            this.resetFields();
        });
    }
    resetFields()  {
        this.setState({
            title: '',
            desc: '',
            number: '',
            game :'csgo'
        });
    }
  
  
render() {
    
    return (

      <Drawer 
        ref ={(ref) =>{this.drawer =ref;}}
        content ={<SideBar navigation ={this.props.navigation}/>}
        onClose ={()=>this.closeDrawer()}>
        <Container style ={style.header}>
            <Header style ={style.header}>
                <Left>
                    <Button
                    transparent
                    onPress={()=> this.openDrawer()}>
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title >Create Post</Title>
                </Body>
                <Right />
            </Header>
            <Content  contentContainerStyle={style.content} padder>
                <Form>
                    <KeyboardAvoidingView  behavior="padding" style={{ justifyContent: 'center',
                                           alignItems: 'center',}} >
                        <View>
                            <Item  floatingLabel style ={this.getStyle().item} onLayout = {this.onLayout.bind(this)}>
                                <Label  style ={this.getStyle().labelInput}>Title of Post</Label>
                                <Input onChangeText={this.onTitleChanged.bind(this)}  value={this.state.title} autoCapitalize="none" autoCorrect={false} style ={style.textarea}/>
                            </Item>
                        </View>
                        <View style={{width:"100%" ,marginTop:20,marginBottom:20,marginLeft:41}}>
                            <Textarea onChangeText={this.onDescriptionChanged.bind(this)}  value={this.state.desc}   style ={this.getStyle().bigtextarea} rowSpan={5} bordered placeholder="Enter a Short Description" />
                        </View>
                        <View>
                            <Item floatingLabel  style ={this.getStyle().item}>
                                <Label  style ={this.getStyle().labelInput}>How many members to find ?</Label>
                                <Input onChangeText={this.onNumberChanged.bind(this)}  value={this.state.number}   style ={this.getStyle().bigtextarea} autoCapitalize="none" autoCorrect={false} style ={this.getStyle().textarea}   keyboardType = 'numeric'/>
                            </Item>
                        </View>
                        <View>
                            <View style={{  marginTop:30, flexDirection: 'row'}}>
                                <View style={{marginTop:10}}>
                                    <Text  style ={this.getStyle().creatText}>What Category </Text>
                                </View>
                                <View>
                                    <Picker 
                                        selectedValue={this.state.game}
                                        style={{ height: 50, width: 100,color :"white",marginLeft:10}}
                                        onValueChange={(itemValue, itemIndex) => this.setState({game: itemValue})}>
                                        <Picker.Item label="CS:GO" value="csgo" />
                                        <Picker.Item label="Fortnite" value="fn" />
                                        <Picker.Item label="PUBG" value="pubg" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{  marginTop:15, flexDirection: 'row'}}>
                                <View style={{marginTop:10}}>
                                    <Text  style ={this.getStyle().creatText}>What Region </Text>
                                </View>
                                <View>
                                    <Picker 
                                        selectedValue={this.state.region}
                                        style ={this.getStyle().region}
                                        onValueChange={(itemValue, itemIndex) => this.setState({region: itemValue})}>
                                        <Picker.Item label="North America" value="na" />
                                        <Picker.Item label="South America" value="sa" />
                                        <Picker.Item label="Europe" value="eu" />
                                        <Picker.Item label="Asia" value="as" />
                                        <Picker.Item label="Africa" value="af" />
                                    </Picker>
                                </View>
                            </View>
                            <View>
                                <Button block onPress={this.onSubmitPressed.bind(this)} primary   style ={this.getStyle().loginButton}>
                                    <Text>POST</Text>
                                </Button>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Form> 
            </Content>
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
    region:{
        height: 50, width: 120,color :"white",marginLeft:10
    }
    
});

//LandScapeMode
const landStyle = StyleSheet.create({
    loginButton: {
        marginTop: 20,
        width: "100%",
        
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
        width:"85%",
        

    },
    bigtextarea: {
        
        borderColor:"white",
        color : "white",
        marginLeft:25,
        marginTop :10,
        width:"85%"
    },
    labelInput :{
        color :"#B2B2B2"
    },
    item:{
        justifyContent: 'center',
        alignItems: 'center',
        width: "85%"
    },
    region:{
        height: 50, width: 120,color :"white",marginLeft:10
    }
});