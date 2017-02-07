import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import store from '../../stores';
import {toggleDrawerAction} from '../../actions/drawer';

export default class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {title: ""};

  }

  stateChanged() {
    const state = store.getState();

    this.setState({
      title: state.title,
      page: state.page
    });
  }

  componentDidMount() {
    store.subscribe(this.stateChanged.bind(this));
  }

  showDrawer() {

    store.dispatch(toggleDrawerAction())

  }

  render() {
    return <AppBar
      title={this.state.title}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap={this.showDrawer.bind(this)}
    />
  }

}
