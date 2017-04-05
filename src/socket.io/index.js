import io from 'socket.io-client'
import * as drawActions from '../actions/draw'
import store from '../stores';
import * as userAction from '../actions/user'
import {DefaultPage} from '../components/pages.default';

let socket;
let sess_token;

export function connect(serverName){
  socket = io(serverName);
  socket.on('HILO',function(data){
    console.log("Hello from HILO in connect in client");
    store.dispatch(userAction.addMember(data.admin, data.id, data.name));
  });
  socket.on('DRAW_EVENT',function(options) {
    drawActions.runEvent(...options.data);
    console.log("Hello from DRAW_EVENT in connect function in clientside");
  });
  socket.on('KILL',function(data){
    store.dispatch(userAction.removeMember(data.id));

    const currentUserKilled = store.getState().user.currentUserId == data.id;
    if(currentUserKilled){
      alert('You have been suspended by the admin.');
      window.location.reload();

    }
  });
  socket.on('SET_NAME', function (data) {
    store.dispatch(userAction.setName(data.name, data.id));
  });
  socket.on('CLEAR_BOARD', function () {
    DefaultPage.clearBoard();
  });
  return socket;
}

export function setSessionToken(s){
  sess_token = s;
}

export function sayHilo(){
  socket.emit('HILO', {
    sess_token: sess_token,
    data: null
  });
}

export function setName(name){
  socket.emit('SET_NAME',{
    sess_token: sess_token,
    data: {
      name: name
    }
  })
}

export function drawEvent(options){
  console.log("Hello from drawEvent in clientside");
  socket.emit('DRAW_EVENT', {
    sess_token: sess_token,
    data: options
  });
}


export function clearBoardClient() {
  socket.emit('CLEAR_BOARD', {
    sess_token: sess_token,
    data: null
  })
}
