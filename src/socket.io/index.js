import io from 'socket.io-client'

let socket;
let sess_token;

export function connect(serverName){
  socket = io(serverName);
  socket.on('HILO',function(data){
    console.log("Got hilo.",data);
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


/*
export function drawEvent(){
  socket.emit('DRAW_EVENT',{
    sess_token: sess_token,
    data:
  })
}

export function listMembers(){
  socket.emit('LIST_MEMBERS',{
    sess_token: sess_token,
    data:
  })
}
*/
