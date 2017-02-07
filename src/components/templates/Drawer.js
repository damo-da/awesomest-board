import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import store from '../../stores';
import * as drawerAction from '../../actions/drawer';
import * as pageAction from '../../actions/page';

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
    store.dispatch(drawerAction.toggleDrawerAction());
  }

  closeDrawer() {
    store.dispatch(drawerAction.closeDrawerAction());
  }

  membersPage() {
    store.dispatch(pageAction.changePageAction('MEMBERS'));
    store.dispatch(pageAction.changePageTitle('Members'));
    this.closeDrawer();

  }

  pencilPage() {
    store.dispatch(pageAction.changePageAction('PENCIL'));
    store.dispatch(pageAction.changePageTitle('Pencil'));
    this.closeDrawer();

  }

  eraser() {
    this.closeDrawer();

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
          <MenuItem onTouchTap={this.membersPage.bind(this)}>Members</MenuItem>
          <MenuItem onTouchTap={this.pencilPage.bind(this)}>Pencil</MenuItem>
          <MenuItem onTouchTap={this.eraser.bind(this)}>Eraser</MenuItem>
          <MenuItem onTouchTap={this.disconnect.bind(this)}>Disconnect</MenuItem>
        </Drawer>
      </div>
    );
  }
}
