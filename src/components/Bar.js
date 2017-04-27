import React, {Component} from 'react';
import store from '../stores';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PaletteIcon from 'material-ui/svg-icons/image/palette';
import PencilEraserIcon from 'material-ui/svg-icons/image/edit';
import CreateCodeIcon from 'material-ui/svg-icons/action/launch';
import MembersIcon from 'material-ui/svg-icons/social/people';
import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import PaintBucketIcon from 'material-ui/svg-icons/editor/format-color-fill';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import PhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import * as pageActions from '../actions/page';
import * as pencilActions from '../actions/pencil';

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
    setTimeout(() => store.dispatch(pencilActions.toggleEraser()), 300);
  }

  paintBucket(){
    store.dispatch(pageActions.showDialog('PAINT_BUCKET'))
  }

  clearBoard(){
    store.dispatch(pageActions.showDialog('CLEAR_BOARD'))

  }

  members(){
    store.dispatch(pageActions.showDialog('MEMBERS'))

  }

  saveImage(){
    store.dispatch(pageActions.showDialog('SAVE_IMAGE'))

  }

  disconnect(){
    store.dispatch(pageActions.showDialog('DISCONNECT'))

  }

  showCreateCode(){
    store.dispatch(pageActions.showDialog('CREATE_CODE'))
  }

  showCreateTokenButton(){
    if(!this.props.user.members)return;
    const currentUser = this.props.user.members.find(x => x.userId == this.props.user.currentUserId);

    if (currentUser && currentUser.admin){
      return <MenuItem
        primaryText="Create code"
        leftIcon={<CreateCodeIcon />} onTouchTap={this.showCreateCode.bind(this)}
      />
    }

  }

  render() {
    const currentUser = this.props.user.members.find(x => x.userId == this.props.user.currentUserId);
    return <div className="bar-component">
      <IconMenu
        style={styles.iconMenu}

        iconButtonElement={
          <IconButton style={styles.arrowDown} iconStyle={styles.arrowDownIcon}>
            <ArrowDownIcon style={styles.arrowDown}/>
          </IconButton>}

        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>

        <MenuItem primaryText="Color and Size" leftIcon={<PaletteIcon />} onTouchTap={this.showPencilOptions.bind(this)}/>
        <MenuItem primaryText={this.props.pencil.type == 'ERASER'?"Activate Pencil":"Activate Eraser"} leftIcon={<PencilEraserIcon />} onTouchTap={this.eraser.bind(this)}/>

        <MenuItem primaryText="Paint Bucket" leftIcon={<PaintBucketIcon />} onTouchTap={this.paintBucket.bind(this)}/>

        {currentUser && currentUser.admin &&
            <MenuItem primaryText="Clear" leftIcon={<DeleteIcon />} onTouchTap={this.clearBoard.bind(this)}/>
        }

        {this.showCreateTokenButton()}
        <MenuItem primaryText="Members" leftIcon={<MembersIcon />} onTouchTap={this.members.bind(this)}/>
        <MenuItem primaryText="Save Image" leftIcon={<PhotoIcon />} onTouchTap={this.saveImage.bind(this)}/>

        {currentUser && !currentUser.admin &&
        <MenuItem primaryText="Disconnect" leftIcon={<NavigationClose />} onTouchTap={this.disconnect.bind(this)}/> }
      </IconMenu>
    </div>
  }

}
Bar.defaultProps = {
  title: 'Awesome-est Board ever!',
  page: 'DEFAULT'
};


const mapStateToProps = (state) => ({
  user: state.user,
  pencil: state.pencil
});

export default connect(
  mapStateToProps
)(Bar);
