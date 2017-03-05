import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {changePage} from '../actions/page';
import store from '../stores';

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
    this.setState({primary: !this.state.primary});
  }

  clickedCreateBoardButton(){
    store.dispatch(changePage('MAIN'));

  }

  render(){
    return <div style={style.divStyle}>
      <h1 style={style.headerStyle}>Welcome to Awesomest-board</h1>


      <Paper zDepth={4} style={styleTwo}>
        <RaisedButton label="Create board" style={style} onTouchTap={this.clickedCreateBoardButton.bind(this)} />
        <Divider />
        <TextField hintText="Enter access code" style={style}  />
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
