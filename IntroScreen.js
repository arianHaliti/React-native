import React from 'react';
import { Spinner } from 'native-base';
import { Alert, AsyncStorage, Text, Button, View, Image, Animated } from 'react-native';
import firebase from 'firebase';

export default class IntroScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            logoOpacity: new Animated.Value(0),
            spinValue : new Animated.Value(0)
        }
    }

    componentDidMount() {
       
        AsyncStorage.getItem("visitedAlready", function(err, result) {
            if (result == null) {
                Animated.parallel([
                    Animated.timing(
                        this.state.logoOpacity,
                        {
                            duration: 100,
                            toValue: 1
                        }
                    ),
                    Animated.timing(
                        this.state.spinValue,
                      {
                        toValue: 2,
                        duration: 100,
                        
                      }
                    )
                ]).start(this.goToMain.bind(this));
            } else {
                Alert.alert("already visited!");
            }
        }.bind(this));

        
       
    }
    goToMain() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null)
                this.props.navigation.navigate('Main');
            else
                this.props.navigation.navigate('Login');
        });
    }
   
    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={style.container}>
                <Animated.Image source={require('./assets/img/logotxt.jpg') }
                    
                    style={{
                        opacity: this.state.logoOpacity

                    }}
                    
                    />
                <Animated.Image source={require('./assets/img/logo.jpg') }
                
                style={{
                    transform: [{rotate: spin}]

                }}
                
                />
            </View>
        );
    }
}
const style = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0C3542"
    }
}