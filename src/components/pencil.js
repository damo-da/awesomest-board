import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import Slider from 'material-ui/Slider';
import {getPencilsData} from '../pencils';
import { CirclePicker } from 'react-color';
import store from '../stores';
import * as pencilActions from '../actions/pencil';
import IconButton from 'material-ui/IconButton';

import EraserBrushIcon from 'material-ui/svg-icons/action/flip-to-front';
import PencilBrushIcon from 'material-ui/svg-icons/image/brush';

const WIDTH_1 = 350;
const BRUSH_SIZE_MULTIPLIER = 70; // when slider is full, pencil becomes 70 pixels

const styles = {
  root: {
    marginBottom: 20
  },
  gridList: {
    width: 500
  },
  leftBox: {
    width: '50%',
    float: 'left'
  },
  rightBox: {
    width: '15%',
    marginRight: '20%',
    float: 'right'
  },
  outBox: {

  },
  brushTypeBox: {
    textAlign: 'center',
    border: 'solid 2px'
  }
};


class PencilPage extends Component{
  pencils = getPencilsData();
  state = {data: []};

  handleColorChange = (color)=>{
    store.dispatch(pencilActions.changedColor(color.hex))
  };

  handleSizeChange = (e, size)=>{
    store.dispatch(pencilActions.changedSize(size * BRUSH_SIZE_MULTIPLIER))
  };

  handleTypeChange (key){
    if(this.props.type != key){
      store.dispatch(pencilActions.changeBrushType(key));
    }
  }

  componentDidMount(){
    this.setState({
      data:[
      {name: 'Pencil', key: 'PENCIL', icon: <PencilBrushIcon />},
      {name: 'Eraser', key: 'ERASER', icon: <EraserBrushIcon />}
    ]}
    );
  }

  render(){
    return (
      <div style={styles.outBox}>

        <div style={styles.leftBox}>
          {/*Size of brush*/}
          Size
          <Slider defaultValue={this.props.size / BRUSH_SIZE_MULTIPLIER} style={{width: WIDTH_1}}
                  onChange={ this.handleSizeChange }/>

          {/*Color*/}
          {this.props.type != 'ERASER' &&
          <CirclePicker
            color={this.props.color}
            onChangeComplete={this.handleColorChange}/>
          }

        </div>

        <div style={styles.rightBox}>

          {/*Brush type*/}
          <div style={styles.brushTypeBox}>
            {this.state.data.map(d =>
              <IconButton
                tooltip={d.name}
                key={d.key}
                iconStyle={d.key == this.props.type?{color: 'red'}:{}}
                onTouchTap={this.handleTypeChange.bind(this, d.key)}>
                {d.icon}
              </IconButton>
            )}

          </div>

        </div>

      </div>

    )

  }
}

const mapStateToProps = (state) => state.pencil;

export default connect(
  mapStateToProps
)(PencilPage);
