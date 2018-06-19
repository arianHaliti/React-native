import React from 'react';
import { StyleSheet, Alert, Image, BackHandler } from 'react-native';
import { Container, Header, Content, Form, Item,Thumbnail, Input, Label, Button, Text, Left, Body, Icon, Title, Right } from 'native-base';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export default class SignUpScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            nickName:'',
            errorMessage: null
        };

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            this.goBack();
            return true;
        }.bind(this));
    }

    onEmailInputChanged(val) {
        this.setState({ email: val });
    }
    onNicknameInputChanged(val){
        this.setState({nickName : val});
    }
    onPasswordInputChanged(val) {
        this.setState({ password: val });
    }

    onConfirmPwdInputChanged(val) {
        this.setState({ confirmPassword: val });
    }

    onSubmitBtnPressed() {
        if (this.state.password != this.state.confirmPassword) {
            Alert.alert("Error", "Passwords don't match");
            return false;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Login'))
            .then(()=> this.db())
            .catch(error => {
                Alert.alert("Registration error", error.message);
            });

    
          
             
    }
    db(){
         user = firebase.auth().currentUser;
         console.log(this.state.email+'*********'+user+'********'+this.state.nickName);
          
            firebase.database().ref('users/' + user.uid).set({
            email: this.state.email,
            groups:{},
            nickname : this.state.nickName,
            logo : 'logos.png'
            });
    }
    goBack() {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <Container>
                    
                    <Content contentContainerStyle={style.content}>
                        <Form style={style.form}>
                            <Thumbnail source={require('./assets/img/register.png')} />
                            <Item floatingLabel>
                                <Label style={style.labelInput}>Email</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={style.textInput}
                                    onChangeText={this
                                    .onEmailInputChanged
                                    .bind(this)}/>
                            </Item>
                            <Item floatingLabel>
                                <Label style={style.labelInput}>Nickname</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={style.textInput}
                                    onChangeText={this
                                    .onNicknameInputChanged
                                    .bind(this)}/>
                            </Item>
                            <Item floatingLabel>
                                <Label style={style.labelInput}>Password</Label>
                                <Input
                                    autoCapitalize="none"
                                    style={style.textInput}
                                    secureTextEntry
                                    onChangeText={this
                                    .onPasswordInputChanged
                                    .bind(this)}/>
                            </Item>
                            <Item floatingLabel>
                                <Label style={style.labelInput}>Confirm password</Label>
                                <Input
                                    autoCapitalize="none"
                                    style={style.textInput}
                                    secureTextEntry
                                    onChangeText={this
                                    .onConfirmPwdInputChanged
                                    .bind(this)}/>
                            </Item>
                            <Button
                                block
                                primary
                                onPress={this
                                .onSubmitBtnPressed
                                .bind(this)}
                                style={style.submitButton}>
                                <Text>Sign up</Text>
                            </Button>
                            <Text style={style.loginText}>Already have an Account ? &nbsp; 
                                <Text style={style.loginTextLink}
                                    
                                    onPress={this.goBack.bind(this)}>
                                     Login here
                                </Text>
                            </Text>
                        </Form>
                    </Content>
                </Container>
        )
    }
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#0C3542',
    },
    submitButton: {
        marginTop: 30,
        marginBottom: 20,
        width: "70%",
        alignSelf: "center",
        backgroundColor: '#009A9A',
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    labelInput :{
        color:'#B2B2B2',
    },
    loginText: {
        fontSize:12,
        alignSelf: "center",
        color: '#B2B2B2', 
    },
    loginTextLink :{
        fontSize:12,
        alignSelf: "center",
        color: '#009A9A',
        fontWeight : 'bold',
    },
    textInput :{
        color :'white',
    },
});
