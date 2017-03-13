import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import store from '../stores';
import * as snackBarActions from '../actions/snackBar'
import {connect} from 'react-redux';

export class SnackBarComponent extends React.Component{
  componentDidMount(){
  }

  handleClose(){
    return store.dispatch(snackBarActions.hideText());
  }

  render(){
    return <Snackbar
        open={this.props.open}
        message={this.props.text || ""}
        autoHideDuration={4000}
        onRequestClose={this.handleClose.bind(this)}
      />

  }
}


const mapStateToProps = (state) => state.snackBar;

export default connect(
  mapStateToProps
)(SnackBarComponent);
