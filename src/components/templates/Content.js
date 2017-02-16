import React, {Component} from 'react';

import LoginPage from '../pages/login';
import DefaultPage from '../pages/default';
import MembersPage from '../pages/members';
import PencilPage from '../pages/pencil';
import {connect} from 'react-redux';

const style = {
  page: {
    marginLeft: 25
  }
};

/**
 * The body of the page goes here
 **/
class Content extends Component {
  getElement() {
    switch (this.props.page) {
      case 'PENCIL': {
        return <PencilPage/>
      }
      case 'MEMBERS': {
        return <MembersPage/>
      }
      case 'LOGIN': {
        return <LoginPage/>
      }
      default: {
        return <DefaultPage/>
      }
    }
  }

  render() {
    const element = this.getElement();
    return (
      <div style={style.page}>
        {element}
      </div>
    )
  }

}


const mapStateToProps = (state) => state.info;

export default connect(
  mapStateToProps
)(Content);
