import io from 'socket.io-client'
import * as drawActions from '../actions/draw'
import store from '../stores';
import * as userAction from '../actions/user'


let socket;
let sess_token;

export function connect(serverName){
  socket = io(serverName);
  socket.on('HILO',function(data){
    store.dispatch(userAction.addMember(data.admin, data.id, data.name));
  });
  socket.on('DRAW_EVENT',function(options) {
    drawActions.runEvent(...options.data);
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
  socket.emit('DRAW_EVENT', {
    sess_token: sess_token,
    data: options
  });
}

