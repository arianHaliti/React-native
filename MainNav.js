
import { DrawerNavigator } from "react-navigation";

import CreatePost from "./CreatePost";
import FindPlayer from "./FindPlayer";
import Profile from "./Profile";
import MainScreen from "./MainScreen";
import GroupInfo from "./GroupInfo.js";


export default DrawerNavigator({
    Main: { screen: MainScreen },
    Create :{screen :CreatePost},
    Find : {screen : FindPlayer},
    Profile :{screen :Profile},
   
});