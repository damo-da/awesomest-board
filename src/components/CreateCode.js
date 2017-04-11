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
    padding: 9,
    background: 'lightgray',
  },
  generateCodeBtn: {


  }
};
export class CreateCode extends React.Component{

  constructor(props){
    super(props);

    this.state = {ips: [
    ]};

  }

  componentWillMount(){
    axios.get(`http://${C.SERVER_FULL_ADDRESS}/ips`)
      .then(x => x.data)
      .then(x => {
        this.setState({ips: x.ips});
      });

  }

  handleClose(){
    store.dispatch(pageActions.showDialog(''));
  }

  generateNewCode(){
    const url = `http://${C.SERVER_FULL_ADDRESS}/createCode`;
    axios.post(url, {
      sess_token: this.props.user.sess_token
    })
      .then(x => x.data)
      .then(x => {
        store.dispatch(pageActions.changeCreateCode(x.token));
      })

  }

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
        </span>
        }

        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <RaisedButton label="Generate new code" secondary={true} style={styles.generateCodeBtn} onTouchTap={this.generateNewCode.bind(this)}/>

        <h3>Server IPs</h3>
        {this.state.ips.map((x,index) =>
          <div key={index}>
            {x}
          </div>
        )}

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
