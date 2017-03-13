import React, {Component} from 'react';
import store from '../stores';
import * as pageActions from '../actions/page';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PencilIcon from 'material-ui/svg-icons/image/brush';
import EraserIcon from 'material-ui/svg-icons/action/flip-to-front';
import CreateCodeIcon from 'material-ui/svg-icons/action/launch';
import MembersIcon from 'material-ui/svg-icons/social/people';
import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  arrowDown: {
    width: 120,
    height: 120,
    padding: 30
  },
  arrowDownIcon: {
    width: 60,
    height: 60
  },
  iconMenu: {
    position: 'absolute',
    right: 0,
    top: 0
  }
};
export class Bar extends Component {

  showPencilOptions(){
    store.dispatch(pageActions.showDialog('PENCIL'))

  }

  eraser(){
    store.dispatch(pageActions.showDialog('ERASER'))

  }

  members(){
    store.dispatch(pageActions.showDialog('MEMBERS'))

  }
  disconnect(){
    store.dispatch(pageActions.showDialog('DISCONNECT'))

  }

  showCreateCode(){
    store.dispatch(pageActions.showDialog('CREATE_CODE'))
  }

  showCreateTokenButton(){
    if(!this.props.members)return;
    const currentUser = this.props.members.find(x => x.userId == this.props.currentUserId);

    if (currentUser && currentUser.admin){
      return <MenuItem
        primaryText="Create code"
        leftIcon={<CreateCodeIcon />} onTouchTap={this.showCreateCode.bind(this)}
      />
    }

  }

  render() {
    return <div className="bar-component">
      <IconMenu
        style={styles.iconMenu}

        iconButtonElement={
          <IconButton style={styles.arrowDown} iconStyle={styles.arrowDownIcon}>
            <ArrowDownIcon style={styles.arrowDown}/>
          </IconButton>}

        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>

        <MenuItem primaryText="Pencil" leftIcon={<PencilIcon />} onTouchTap={this.showPencilOptions.bind(this)}/>
        <MenuItem primaryText="Eraser" leftIcon={<EraserIcon />} onTouchTap={this.eraser.bind(this)}/>
        {this.showCreateTokenButton()}
        <MenuItem primaryText="Members" leftIcon={<MembersIcon />} onTouchTap={this.members.bind(this)}/>
        <MenuItem primaryText="Disconnect" leftIcon={<NavigationClose />} onTouchTap={this.disconnect.bind(this)}/>
      </IconMenu>
    </div>
  }

}
Bar.defaultProps = {
  title: 'Awesome-est Board ever!',
  page: 'DEFAULT'
};


const mapStateToProps = (state) => state.user;

export default connect(
  mapStateToProps
)(Bar);
