import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import * as drawAction from '../../actions/draw';
import {connect} from 'react-redux';

const PAGE_WIDTH = 500;
const PAGE_HEIGHT = 500;

class DefaultPage extends Component{
  pressed = false;

  ctx = null;
  canvas = null;

  width = PAGE_WIDTH;
  height = PAGE_HEIGHT;

  componentDidMount(){
    this.canvas = ReactDOM.findDOMNode(this.refs.canvas);

    this.setListeners();

    drawAction.initCanvas(this.canvas, PAGE_WIDTH, PAGE_HEIGHT);

  }

  getMousePos(e){
    let mouseX, mouseY;

    if (e.offsetX) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    }
    else if (e.layerX) {
      mouseX = e.layerX;
      mouseY = e.layerY;
    }

    mouseX = this.width * mouseX / PAGE_WIDTH;
    mouseY = this.height * mouseY / PAGE_HEIGHT;

    return {mouseX, mouseY};
  }

  setListeners(){
    this.canvas.addEventListener("mousedown", this.onPressDown.bind(this), false);
    this.canvas.addEventListener("mouseup", this.onPressUp.bind(this), false);
    this.canvas.addEventListener("mousemove", this.onMove.bind(this), false);
  }

  //onMouseDown, onTouchDown, whatever
  onPressDown(e){
    this.pressed = true;

    const {mouseX, mouseY} = this.getMousePos(e);
    drawAction.mouseDown(mouseX, mouseY, this.props.pencil);
  }

  //onMouseMove, onTouchMove, whatever
  onMove(e){
    if(!this.pressed) return;

    const {mouseX, mouseY} = this.getMousePos(e);
    drawAction.mouseMove(mouseX, mouseY, this.props.pencil);
  }

  //onMouseUp, onTouchUp, whatever
  onPressUp(e){
    this.pressed = false;

    const {mouseX, mouseY} = this.getMousePos(e);
    drawAction.mouseUp(mouseX, mouseY, this.props.pencil);
  }

  render(){
    return (
      <div>
        <h1>Draw</h1>

        <canvas ref='canvas'  style={{width:PAGE_WIDTH, height:PAGE_HEIGHT}}/>
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  pencil: state.pencil
});

export default connect(mapStateToProps)(DefaultPage);
