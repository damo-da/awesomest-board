import React, {Component} from 'react';
import store from '../stores';
import {connect} from 'react-redux';
import Slider from 'material-ui/Slider';
import * as pencilActions from '../actions/pencil';
import RaisedButton from 'material-ui/RaisedButton';

const WIDTH_1 = 350;
const BRUSH_SIZE_MULTIPLIER = 70; // when slider is full, pencil becomes 70 pixels
const bgColor = '#c8c8c8';

class EraserPage extends Component {

  handleColorChange = () => {
    store.dispatch(pencilActions.changedColor(bgColor))
  };

  handleSizeChange = (e, size)=>{
    store.dispatch(pencilActions.changedSize(size * BRUSH_SIZE_MULTIPLIER))
  };

  render() {
    return (
      <div>
        <h1>Choose Size</h1>

        {/*Size of Eraser*/}
        <Slider defaultValue={this.props.size / BRUSH_SIZE_MULTIPLIER} style={{width:WIDTH_1}} onChange={ this.handleSizeChange } />

        <RaisedButton
          label = 'Activate Eraser'
          secondary={true}
          color={bgColor}
          onTouchTap={this.handleColorChange}/>

      </div>
    )
  }

}

const mapStateToProps = (state) => state.user;

export default connect(
  mapStateToProps
)(EraserPage);
