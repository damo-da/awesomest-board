import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import * as drawAction from '../actions/draw';
import * as pageAction from '../actions/page';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import store from '../stores';
import {changePage} from '../actions/page';
import Pencil from './pencil'
import Members from './members'
import CreateCodeComponent from './CreateCode';
import * as socketActions from '../socket.io';
import * as userActions from '../actions/user';
import axios from 'axios';
import { WindowResizeListener } from 'react-window-resize-listener'
import C from '../constants';

class DefaultPage extends Component{
  pressed = false;

  canvas = null;

  width = 0;
  height = 0;

  componentDidMount(){
    this.canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.setListeners();
    this.updateWindowSize();

    socketActions.setSessionToken(this.props.user.sess_token);
    socketActions.connect(C.SERVER_IP);
    socketActions.sayHilo();

    const name = prompt("Enter your name");
    store.dispatch(userActions.setName(name));
    socketActions.setName(name);
  }

  handleClose(){
    store.dispatch(pageAction.showDialog(''))
  }

  updateWindowSize(){
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;

    drawAction.initCanvas(this.canvas, this.width, this.height);
  }

  getMousePos(e){
    let mouseX, mouseY;

    if (e.type.indexOf('touch') >= 0){//touch screen
      const canvasRect = this.canvas.getBoundingClientRect();

      mouseX = e.touches[0].pageX - canvasRect.left;
      mouseY = e.touches[0].pageY - canvasRect.top;

    }else { //probably using mouse
      if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
      }
      else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
      }
    }


    return {mouseX, mouseY};
  }

  setListeners(){
    this.canvas.addEventListener('touchstart', this.onPressDown.bind(this), false);
    this.canvas.addEventListener('mousedown', this.onPressDown.bind(this), false);

    this.canvas.addEventListener('mouseup', this.onPressUp.bind(this), false);
    this.canvas.addEventListener('touchend', this.onPressUp.bind(this), false);

    this.canvas.addEventListener('touchmove', this.onMove.bind(this), false);
    this.canvas.addEventListener('mousemove', this.onMove.bind(this), false);
  }

  runEvent(...options){
    socketActions.drawEvent(options);
    return drawAction.runEvent(...options);
  }

  //onMouseDown, onTouchDown, whatever
  onPressDown(e){
    this.pressed = true;

    const {mouseX, mouseY} = this.getMousePos(e);
    this.runEvent(C.MOUSE_DOWN, mouseX, mouseY, this.props.pencil);
  }

  //onMouseMove, onTouchMove, whatever
  onMove(e){
    if(!this.pressed) return;

    const {mouseX, mouseY} = this.getMousePos(e);
    this.runEvent(C.MOUSE_MOVE, mouseX, mouseY, this.props.pencil);
  }

  //onMouseUp, onTouchUp, whatever
  onPressUp(e){
    this.pressed = false;

    const {mouseX, mouseY} = this.getMousePos(e);
    this.runEvent(C.MOUSE_UP, mouseX, mouseY, this.props.pencil);
  }

  createDialog(content, title='Board'){
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
  disconnectUser() {
    this.handleClose();

    const url = 'http://' + C.SERVER_IP + '/kill/';
    axios.post(url, {
      sess_token: this.props.user.sess_token
    })
      .then((x) => x.data)
      .then(x => {
        alert(member.url + 'disconnected from the system.')
      });


    // store.dispatch(changePage('LOGIN'));
  }
  getOpenDialog(){
    switch(this.props.info.dialog){
      case 'PENCIL': {
        return this.createDialog(<Pencil/>, 'Pencil')
      }
      case 'MEMBERS': {
        return this.createDialog(<Members />, 'Members')
      }
      case 'DISCONNECT': {
        return <Dialog
          title={'Are you sure?'}
          actions={[<FlatButton
            label="Yes"
            primary={true}
            onTouchTap={this.disconnectUser.bind(this)}
          />,<FlatButton
            label="No"
            secondary={true}
            onTouchTap={this.handleClose.bind(this)}
          />]}
          modal={false}
          open={true}
          onRequestClose={this.handleClose.bind(this)}
        >

        </Dialog>
      }
      case 'CREATE_CODE': {
        return <CreateCodeComponent />
      }
      default: {
        return null
      }
    }
  }

  render(){
    return (
      <div>
        <canvas ref='canvas' style={{'overflow': 'hidden'}}/>

        {this.getOpenDialog()}
        <WindowResizeListener onResize={this.updateWindowSize.bind(this)}/>

      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  pencil: state.pencil,
  info: state.info,
  user: state.user
});

export default connect(mapStateToProps)(DefaultPage);
