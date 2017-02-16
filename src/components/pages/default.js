import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import * as drawAction from '../../actions/draw';
import * as pageAction from '../../actions/page';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import store from '../../stores';

import Pencil from './pencil'
import Members from './members'

import C from '../../constants';

const PAGE_WIDTH = 700;
const PAGE_HEIGHT = 700;

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

  handleClose(){
    store.dispatch(pageAction.showDialog(""))
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
    drawAction.runEvent(C.MOUSE_DOWN, mouseX, mouseY, this.props.pencil);
  }

  //onMouseMove, onTouchMove, whatever
  onMove(e){
    if(!this.pressed) return;

    const {mouseX, mouseY} = this.getMousePos(e);
    drawAction.runEvent(C.MOUSE_MOVE, mouseX, mouseY, this.props.pencil);
  }

  //onMouseUp, onTouchUp, whatever
  onPressUp(e){
    this.pressed = false;

    const {mouseX, mouseY} = this.getMousePos(e);
    drawAction.runEvent(C.MOUSE_UP, mouseX, mouseY, this.props.pencil);
  }

  createDialog(content, title="Board"){
    return <Dialog
      title={title}
      actions={<FlatButton
        label="DONE"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />}
      modal={false}
      open={true}
      onRequestClose={this.handleClose.bind(this)}
    >
      {content}
    </Dialog>

  }

  getOpenDialog(){
    switch(this.props.info.dialog){
      case "PENCIL": {
        return this.createDialog(<Pencil/>, "Pencil")
      }
      case "MEMBERS": {
        return this.createDialog(<Members />, "Members")
      }
      default: {
        return null
      }
    }
  }

  render(){
    return (
      <div>
        <h1>Draw</h1>

        <canvas ref='canvas'  style={{width:PAGE_WIDTH, height:PAGE_HEIGHT}}/>

        {this.getOpenDialog()}

      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  pencil: state.pencil,
  info: state.info
});

export default connect(mapStateToProps)(DefaultPage);
