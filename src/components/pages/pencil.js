import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import Slider from 'material-ui/Slider';
import {getPencilsData} from '../../pencils';
import { CirclePicker } from 'react-color';
import store from '../../stores';
import * as pencilActions from '../../actions/pencil';

const WIDTH_1 = 350;
const BRUSH_SIZE_MULTIPLIER = 70; // when slider is full, pencil becomes 70 pixels

const styles = {
  root: {
    marginBottom: 20
  },
  gridList: {
    width: 500,
  },
};




class PencilPage extends Component{
  pencils = getPencilsData();

  handleColorChange = (color)=>{
    store.dispatch(pencilActions.changedColor(color.hex))
  };

  handleSizeChange = (e, size)=>{
    store.dispatch(pencilActions.changedSize(size * BRUSH_SIZE_MULTIPLIER))
  };

  render(){
    return (
      <div>
        <h1>Choose Brush</h1>

        {/*Grid*/}
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            {this.pencils.map((tile, i) => (
              <GridTile
                key={i}
                title={tile.title}
              >
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>

        {/*Size of brush*/}
        Brush Size
        <Slider defaultValue={this.props.size / BRUSH_SIZE_MULTIPLIER} style={{width:WIDTH_1}} onChange={ this.handleSizeChange } />

        {/*Color*/}
        <CirclePicker
          color={this.props.color}
          onChangeComplete={this.handleColorChange}/>

      </div>

    )

  }
}

const mapStateToProps = (state) => state.pencil;

export default connect(
  mapStateToProps
)(PencilPage);
