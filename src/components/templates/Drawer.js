import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import store from '../../stores';
import * as action from '../../actions/drawer';

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  componentWillMount() {
    store.subscribe(()=> {
      const state = store.getState();

      this.setState({
        open: state.open
      });
    })

  }

  handleToggle() {
    store.dispatch(action.toggleDrawerAction());
  }

  closeDrawer() {
    store.dispatch(action.closeDrawerAction());
  }

  membersPage() {

  }

  pencilPage() {

  }

  eraserPage() {

  }

  disconnect() {

  }

  render() {
    return (
      <div>
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
