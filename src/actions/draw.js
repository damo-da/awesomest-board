import {getPencilById} from '../pencils';

let canvas = null;
let ctx = null;

window.lastEvent = {}; // this stores the data for the last event by userId

export const initCanvas = (c, w, h) => {
  canvas = c;

  ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = h;

  canvas.style.width = w+'px';
  canvas.style.height = h+'px';

  ctx.fillStyle = 'rgb(200,200,200)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgb(200,500,200)';
};

const draw = (x, y, pencilId='DEFAULT', size=10, color='#0000ff', type='', userId=0) => {
  const pencil = getPencilById(pencilId);

  const event = {x, y, size, color, type, lastEvent: window.lastEvent[userId]};

  window.lastEvent[userId] = event;

  pencil.draw(ctx, event);
};

export const runEvent = (action, x, y, pencilData, userId=0) => {
  draw(x * canvas.width, y*canvas.height, pencilData.pencil, pencilData.size, pencilData.color, action, userId);

};


export const clearBoard = () => {
  if (canvas){
    initCanvas(canvas, canvas.width, canvas.height);
  }
};

export const saveImage = () => {
  var canvas = document.getElementById("mycanvas");
  var img    = canvas.toDataURL("image/png");

  document.write('<img src="'+img+'"/>');
}
