import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import store from '../../stores';
import {toggleDrawerAction} from '../../actions/drawer';
import * as pageActions from '../../actions/page';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/svg-icons/navigation/menu';

class Bar extends Component {
  constructor(props) {
    super(props);

  }

  showDrawer() {
    store.dispatch(toggleDrawerAction())
  }

  onClickLeftIconButton(){
    if (this.props.page == 'DEFAULT'){
      this.showDrawer();
    }else{
      store.dispatch(pageActions.changePageAction("DEFAULT"));
    }
  }

  render() {
    return <AppBar
      title={this.props.title}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      iconElementLeft={<IconButton>
        {this.props.page == "DEFAULT"?
          <Menu/>:
          <NavigationClose />
        }
      </IconButton>}
      onLeftIconButtonTouchTap={this.onClickLeftIconButton.bind(this)}
    />
  }

}
Bar.defaultProps = {
  title: "Awesome-est Board ever!",
  page: "DEFAULT"
};


const mapStateToProps = (state) => state.info;

export default connect(
  mapStateToProps
)(Bar);
