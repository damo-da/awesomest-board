import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import store from '../../stores';
import {toggleDrawerAction} from '../../actions/drawer';
import * as pageActions from '../../actions/page';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/svg-icons/navigation/menu';
import PencilIcon from 'material-ui/svg-icons/image/brush';
import EraserIcon from 'material-ui/svg-icons/action/flip-to-front';
import MembersIcon from 'material-ui/svg-icons/social/people';

class Bar extends Component {
  constructor(props) {
    super(props);

  }

  showDrawer() {
    store.dispatch(toggleDrawerAction())
  }

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

  onClickLeftIconButton(){
    if (this.props.page == 'DEFAULT'){
      this.showDrawer();
    }else{
      store.dispatch(pageActions.changePageAction('DEFAULT'));
    }
  }

  render() {
    return <AppBar
      title={this.props.title}
      iconElementLeft={<IconButton>
        {this.props.page == 'DEFAULT'?
          <Menu/>:
          <NavigationClose />
        }
      </IconButton>}
      iconElementRight={<div>
        <IconButton onTouchTap={this.showPencilOptions.bind(this)}><PencilIcon /></IconButton>
        <IconButton><EraserIcon onTouchTap={this.eraser.bind(this)}/></IconButton>
        <IconButton><MembersIcon onTouchTap={this.members.bind(this)}/></IconButton>
        <IconButton><NavigationClose onTouchTap={this.disconnect.bind(this)}/></IconButton>
        </div>
      }

      onLeftIconButtonTouchTap={this.onClickLeftIconButton.bind(this)}
    />
  }

}
Bar.defaultProps = {
  title: 'Awesome-est Board ever!',
  page: 'DEFAULT'
};


const mapStateToProps = (state) => state.info;

export default connect(
  mapStateToProps
)(Bar);
