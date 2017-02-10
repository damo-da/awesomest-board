import {getPencilById} from '../pencils';
let canvas = null;
let ctx = null;

let width = 500;
let height = 500;

export const initCanvas = (c, w, h) => {
  canvas = c;

  ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = h;

  width = w;
  height = h;

  ctx.fillStyle = 'rgb(200,200,200)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgb(200,500,200)';
};

const draw = (x, y, pencilId="DEFAULT", size=10, color="#0000ff") => {
  const pencil = getPencilById(pencilId);

  pencil.draw(ctx, {x, y, size, color});
};

export const mouseDown = (x, y, pencilData) => {
  draw(x, y, pencilData.pencil, pencilData.size, pencilData.color);

};

export const mouseMove = (x, y, pencilData) => {
  draw(x, y, pencilData.pencil, pencilData.size, pencilData.color);
};


export const mouseUp = (x, y, pencilData) => {

};
