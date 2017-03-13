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
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import C from '../constants'
import * as pageActions from '../actions/page'


const styles = {
  code: {
    padding: 9,
    background: 'lightgray',
  },
  generateCodeBtn: {


  }
};
export class CreateCode extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      snackBarOpen: false
    };

  }
  handleClose(){
    this.setState({snackBarOpen: false})
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

  copiedToClipboard(){
    this.setState({snackBarOpen: true});
  }

  render(){
    return <Dialog
      title="Create code"
      actions={[<FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />]}
      modal={false}
      open={true}
      onRequestClose={this.handleClose.bind(this)} >
      <div >
        Genereate codes to let other members connect. <br />

        <span style={styles.code}>

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


        </span>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <RaisedButton label="Generate new code" secondary={true} style={styles.generateCodeBtn} onTouchTap={this.generateNewCode.bind(this)}/>


        <Snackbar
          open={this.state.snackBarOpen}
          message="Copied code to clipboard"
          autoHideDuration={4000}
          onRequestClose={this.handleClose.bind(this)}
        />

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
