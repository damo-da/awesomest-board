import React from 'react'
import {connect} from 'react-redux';
import store from '../stores';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CopyCodeIcon from 'material-ui/svg-icons/content/content-copy'
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import axios from 'axios';
import C from '../constants'
import * as pageActions from '../actions/page'
import * as snackBarActions from '../actions/snackBar';

const styles = {
  code: {
  },
  generateCodeBtn: {


  },
  sendCodeBtn: {

  }
};
export class CreateCode extends React.Component{

  constructor(props){
    super(props);

  }
  handleClose(){
    store.dispatch(pageActions.showDialog(''));
  }

  generateNewCode(){
    const url = `http://${C.SERVER_IP}/createCode`;
    axios.post(url, {
      sess_token: this.props.user.sess_token
    })
      .then(x => x.data)
      .then(x => {
        store.dispatch(pageActions.changeCreateCode(x.token));
      })

  }
  /*
  Attempting to pass values to backend routes file

  sendCodeSMS(){
    const url = `http://${C.SERVER_IP}/sendCode`;
    axios.post(url, {
      sess_token: this.props.user.sess_token,
      joinToken: this.props.user.joinToken,
    })
      .then(x => x.data)
      .then(x => {
        store.dispatch(pageActions.handlePhoneChange(x.data))
      })
  }
  */

  copiedToClipboard(){
    store.dispatch(snackBarActions.showText('Code copied to clipboard'));
  }

  render(){
    return <Dialog
      title="Create code"
      actions={[<FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />]}
      modal={false}
      open={true}
      onRequestClose={this.handleClose.bind(this)} >
      <div >
        Genereate codes to let other members connect. <br />

        { this.props.info.codeForMembers && <span style={styles.code}>

          {this.props.info.codeForMembers}

          <IconButton
            iconStyle={styles.smallIcon}
            style={styles.small}
            tooltip={"Copy code to clipboard"}>
            <CopyToClipboard
              text={this.props.info.codeForMembers}
              onCopy={this.copiedToClipboard.bind(this)}>
              <CopyCodeIcon/>
            </CopyToClipboard>
          </IconButton>
          <form>
          <div>
            <h3>
              Enter a phone number below to send a code
            </h3>
            <TextField name = 'phoneNumber' hintText = '+12224447777' label='Phone Number'/>
          </div>
        </form>
        </span>
        }

        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <RaisedButton label="Generate new code" secondary={true} style={styles.generateCodeBtn} onTouchTap={this.generateNewCode.bind(this)}/>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <RaisedButton label="Send Code" primary={true} style={styles.sendCodeBtn} onTouchTap={this.sendCodeSMS.bind(this)}/>

      </div>
    </Dialog>
  }

}


const mapStateToProps = (state) => ({
  info: state.info,
  user: state.user
});

export default connect(
  mapStateToProps
)(CreateCode);
