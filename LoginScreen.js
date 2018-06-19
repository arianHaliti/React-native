import React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, Title, Right, Thumbnail } from 'native-base';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errorMessage: null
        };
    }

    onEmailInputChanged(val) {
        this.setState({
            email: val
        });
    }

    onPasswordInputChanged(val) {
        this.setState({
            password: val
        });
    }

    onSubmitBtnPressed() {
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => {
                Alert.alert("Login error", "Invalid email and/or password");
            });
    }

    onSignUpBtnPressed() {
        this.props.navigation.navigate("SignUp");
    }

    render() {
        return (
            <Container>
                    
                    <Content contentContainerStyle={style.content}>
                        <Form style={style.form}>
                            <Thumbnail source={require('./assets/img/user.png')} />
                            <Item floatingLabel>
                               
                                <Label style ={style.labelInput}>Email</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={style.textInput} onChangeText={this.onEmailInputChanged.bind(this)}/>
                                
                            </Item>
                            <Item floatingLabel >
                                <Label style ={style.labelInput}>Password</Label>
                                <Input autoCapitalize="none" style={style.textInput} secureTextEntry onChangeText={this.onPasswordInputChanged.bind(this)}/>
                            </Item>
                            <Button block primary onPress={this.onSubmitBtnPressed.bind(this)} style={style.loginButton}>
                                <Text>Login</Text>
                            </Button>
                            <Text style={style.signUpText}>Don't have an account ? &nbsp; 
                                <Text style={style.signUpTextlink}
                                    
                                    onPress={this.onSignUpBtnPressed.bind(this)}>
                                     Register here
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
    item :{
        color :'white',

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
