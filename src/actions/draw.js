import {getPencilById} from '../pencils';

let canvas = null;
let ctx = null;

window.lastEvent = {}; // this stores the data for the last event by userId
const events = [];

export const initCanvas = (c, w, h) => {
  canvas = c;

  ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = h;

  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';

  ctx.fillStyle = 'rgb(200,200,200)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgb(200,500,200)';

  events.forEach(event => draw(...event));
};

const draw = (x, y, pencilId = 'DEFAULT', size = 10, color = '#0000ff', type = '', userId = 0) => {
  const pencil = getPencilById(pencilId);

  const event = {x: x* canvas.width, y: y * canvas.height, size, color, type, lastEvent: window.lastEvent[userId]};

  window.lastEvent[userId] = event;

  pencil.draw(ctx, event);
};

export const runEvent = (action, x, y, pencilData, userId = 0) => {
  const args = [x, y, pencilData.pencil, pencilData.size, pencilData.color, action, userId]
  events.push(args);
  draw(...args);
};


export const clearBoard = () => {
  if (canvas) {
    initCanvas(canvas, canvas.width, canvas.height);
  }
};

export const saveCanvas = () => {
  canvas.toDataURL('image/png');
  const drawingString = canvas.toDataURL('png');
  let a = document.createElement('a');
  a.href = drawingString;
  a.download = 'canvas.png';
  a.click();
};
