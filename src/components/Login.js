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
import * as snackBarActions from '../actions/snackBar'
import {isValidIp} from '../utils';


const styles = {
  wrapper: {
    width: '100%',
    marginTop: '12%',
    textAlign: 'center'
  },
  innerWrapper: {
    display: 'inline-block'
  },
  paper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  createBtn: {
    marginBottom: 15,
  },
  title: {
    marginBottom: '10%'
  },
  separatorText: {
    margin: 20,
    color: 'gray',
    fontSize: 'x-large'
  }
};

class LoginComponent extends React.Component {
  constructor(){
    super();

    this.state = {primary: true};

  }

  //validate and convert server address into
  getServerAddress(){
    const userInput = this.refs.serverAddress.getValue();
    if(isValidIp(userInput)){
      return `${userInput}:${C.SERVER_PORT}`;
    }

  }
  clickedLoginButton(){
    const accessCode = this.refs.accessCode.getValue();
    const serverAddress = this.getServerAddress();

    if(!serverAddress)
      return store.dispatch(snackBarActions.showText('Please enter a valid server address'));

    //Although this is a constant. We're updating the constant value here. This is a FEATURE, rely on this.
    C.SERVER_FULL_ADDRESS = serverAddress;

    const url = 'http://' + C.SERVER_FULL_ADDRESS + '/connect';
    axios.post(url, {
      token: accessCode
    })
      .then((x) => {
        if (!x.data)throw Error('no data found');
        x = x.data;

        if (x.code === 0) {
          store.dispatch(userActions.addMember(false, x.user_id, ''));
          store.dispatch(userActions.setToken(x.sess_token));
          store.dispatch(userActions.changeUserId(x.user_id));

          store.dispatch(userActions.replaceMembers(x.members.map(y => {
            return {name: y.name, userId: y.id, admin: y.admin};
          })));

          store.dispatch(changePage('MAIN'));
        }
      })
      .catch(x => {
        if (x && x.response && x.response.status == 406){
          store.dispatch(snackBarActions.showText('Check your token.'));

        }else{
          store.dispatch(snackBarActions.showText('Could not connect to server. Please try again'));
        }
      });
  }

  clickedCreateBoardButton(){
    const url = 'http://' + C.SERVER_FULL_ADDRESS + '/create';
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
        if(x && x.response && x.response == 400){
          store.dispatch(snackBarActions.showText('There is an existing server'));
        }else{
          store.dispatch(snackBarActions.showText('Could not connect to server. Please try again'));
        }
      })
  }

  render(){
    return <div style={styles.wrapper}>
      <div style={styles.innerWrapper}>
          <h1 style={styles.title}>Welcome to Valerie</h1>


          <Paper zDepth={4} style={styles.paper} >
            <RaisedButton label="Create board" style={styles.createBtn} onTouchTap={this.clickedCreateBoardButton.bind(this)} />
            <div style={styles.separatorText}>
              OR
            </div>
            <TextField ref="accessCode" hintText="Enter access code" fullWidth={true} />
            <TextField ref="serverAddress" hintText="Server address" fullWidth={true} />
            <RaisedButton label="Join board"
                          primary={this.state.primary}
                          secondary={!this.state.primary}
                          onTouchTap={this.clickedLoginButton.bind(this)} />

          </Paper>
      </div>
    </div>
  }
}

export default LoginComponent;
