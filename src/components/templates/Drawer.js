import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import store from '../../stores';
import * as drawerAction from '../../actions/drawer';
import * as pageAction from '../../actions/page';
import {connect} from 'react-redux';

class CustomDrawer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  handleToggle() {
    store.dispatch(drawerAction.toggleDrawerAction());
  }

  closeDrawer() {
    store.dispatch(drawerAction.closeDrawerAction());
  }

  membersPage() {
    store.dispatch(pageAction.changePageAction('MEMBERS'));
    this.closeDrawer();

  }

  pencilPage() {
    store.dispatch(pageAction.changePageAction('PENCIL'));
    this.closeDrawer();

  }

  eraser() {
    this.closeDrawer();

  }

  disconnect() {
    this.closeDrawer();

  }

  render() {
    return (
      <div>
        <Drawer open={this.props.open}
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

const mapStateToProps = (state) => {
  if(!state)state = {};
  return {
    open: state.open
  }
};

export default connect(
  mapStateToProps
)(CustomDrawer);
