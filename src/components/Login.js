import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {changePage} from '../actions/page';
import store from '../stores';
import axios from 'axios';
import C from '../constants';
import * as userActions from '../actions/user';

const style = {
  divStyle: {
    display: 'block',
    textAlign: 'center',
  },
  headerStyle: {
    textAlign: 'center',
  },

};

const styleTwo = {
  marginLeft: 550,
  width: 500,
  borderRadius: 10,
};


class LoginComponent extends React.Component {
  constructor(){
    super();

    this.state = {primary: true};

  }
  clickedLoginButton(){
    const accessCode = this.refs.accessCode.getValue();
    const url = 'http://' + C.SERVER_IP + '/connect';
    axios.post(url, {
      token: accessCode
    })
      .then((x) => x.data)
      .then((x) => {
        if (x.code === 0){
          store.dispatch(userActions.addMember(false, x.user_id, ''));
          store.dispatch(userActions.setToken(x.sess_token));
          store.dispatch(userActions.changeUserId(x.user_id));

          store.dispatch(changePage('MAIN'));
        }
      })
  }

  clickedCreateBoardButton(){
    const url = 'http://' + C.SERVER_IP + '/create';
    axios.get(url)
      .then((x) => x.data)
      .then((x) => {
        if (x.code === 0){
          store.dispatch(userActions.addMember(true, x.user_id, ''));
          store.dispatch(userActions.setToken(x.sess_token));
          store.dispatch(userActions.changeUserId(x.user_id));

          store.dispatch(changePage('MAIN'));
        }
      })
      .catch((x) => {
        alert('error. check console');
        console.log(x);
      })
  }

  render(){
    return <div style={style.divStyle}>
      <h1 style={style.headerStyle}>Welcome to Awesomest-board</h1>


      <Paper zDepth={4} style={styleTwo}>
        <RaisedButton label="Create board" style={style} onTouchTap={this.clickedCreateBoardButton.bind(this)} />
        <Divider />
        <TextField ref="accessCode"hintText="Enter access code" style={style}  />
        <TextField hintText="IP" style={style} />
        <br />
        <RaisedButton label="Join board"
                      primary={this.state.primary}
                      secondary={!this.state.primary}
                      style={style}
                      onTouchTap={this.clickedLoginButton.bind(this)} />

      </Paper>
    </div>
  }
}

export default LoginComponent;
