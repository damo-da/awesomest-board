import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

export default class Bar extends Component {
  showDrawer(){
    console.log("toggling drawer")

  }

  render() {
    return <AppBar
      title={this.props.title}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap={this.showDrawer.bind(this)}
    />
  }

}

Bar.defaultProps = {
  title: "Awesomest board EVER"
};
