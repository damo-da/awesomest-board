import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }
  closeDrawer(){
    console.log("closing drawer");
    this.setState({open: false})
  }
  membersPage(){

  }
  pencilPage(){

  }
  eraserPage(){

  }
  disconnect(){

  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle.bind(this)}
        />
        <Drawer open={this.state.open}
                docked={false}
                width={200}
                onRequestChange={this.closeDrawer.bind(this)}>
          <MenuItem>Members</MenuItem>
          <MenuItem>Pencil</MenuItem>
          <MenuItem>Eraser</MenuItem>
          <MenuItem>Disconnect</MenuItem>
        </Drawer>
      </div>
    );
  }
}
