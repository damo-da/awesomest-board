import React, {Component} from "react";
import store from '../../stores';

import LoginPage from '../pages/login';
import DefaultPage from '../pages/default';
import MembersPage from '../pages/members';
import PencilPage from '../pages/pencil';
/**
 * The body of the page goes here
 **/
export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'DEFAULT'
    };

  }

  componentWillMount() {
    store.subscribe(()=> {
      const state = store.getState();

      this.setState({'page': state.page});
    })
  }

  getElement() {
    switch (this.state.page) {
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
      <div>
        {element}
      </div>


    )
  }

}
