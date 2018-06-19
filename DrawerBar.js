import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from './SideBar';
export default class DrawerBar extends Component {
  render() {
    
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
      // Main View
      </Drawer>
    );
  }
}