import React, { Component } from "react";
import { SwitchNavigator ,StackNavigator} from "react-navigation";
import MainScreen from "./MainScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import firebase from 'firebase';
import Config from './Config';
import StyleWrapper from './StyleWrapper';
import IntroScreen from "./IntroScreen";
import MainNav from "./MainNav";
import CreatePost from "./CreatePost";
import FindPlayer from "./FindPlayer";
import Profile from "./Profile";
import GroupInfo from "./GroupInfo";
import EditProfile from "./EditProfile";
firebase.initializeApp(Config.firebaseConfig);

class App extends Component {
    render() {
        return (
        <StyleWrapper>
            <AppNavigator/>
        </StyleWrapper>);
    }
}
const stackNavigator = StackNavigator({
    Find: { screen: FindPlayer },
    GroupInfo :{screen:GroupInfo}
 }, {
    headerMode: 'none'
 });
 const stackNavigatorProfile = StackNavigator({
    Profile: { screen: Profile },
    EditProfile :{screen:EditProfile}
 }, {
    headerMode: 'none'
 });
const AppNavigator = SwitchNavigator({
   // loading: {screen :LoadingScreen},
    Intro: { screen: IntroScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    MainNav: { screen :MainNav},
    Stack: {
        
        screen: stackNavigator
      },
    ProfileStack :{
        screen: stackNavigatorProfile,
    }

    

   
}, {
    headerMode: 'none'
});

export default App;
