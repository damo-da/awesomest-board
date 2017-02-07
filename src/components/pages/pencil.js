import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import Slider from 'material-ui/Slider';
import brushesData from '../../brushes';
import { CirclePicker } from 'react-color';

const WIDTH_1 = 350;

const styles = {
  root: {
    marginBottom: 20
  },
  gridList: {
    width: 500,
  },
};




class PencilPage extends Component{

  render(){
    return (
      <div>
        <h1>Choose Pencil</h1>

        {/*Grid*/}
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            {brushesData.map((tile) => (
              <GridTile
                key={tile.img}
                title={tile.title}
              >
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>

        {/*Size of brush*/}
        Brush Size
        <Slider defaultValue={0.5} style={{width:WIDTH_1}} />

        {/*Color*/}
        <CirclePicker/>

      </div>

    )

  }
}

const mapStateToProps = (state) => state.pencil;

export default connect(
  mapStateToProps
)(PencilPage);
