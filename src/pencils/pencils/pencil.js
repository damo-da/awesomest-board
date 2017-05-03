import BasePencil from '../base';
import C from '../../constants';

class Pencil extends BasePencil {
  static SIZE_CONST = 0.5;

  draw(ctx, data) {
    const {x, y} = data;

    const radius = data.size * Pencil.SIZE_CONST;

    ctx.fillStyle = data.color;
    ctx.strokeStyle  = data.color;

    switch(data.type){
      case C.MOUSE_DOWN: {
        ctx.beginPath();
        ctx.lineWidth=radius/2.0;
        ctx.moveTo(x, y);
        break;
      }
      case C.MOUSE_MOVE:{
        ctx.lineTo(x,y);
        ctx.stroke();
        break;

      }
      case C.MOUSE_UP: {

      }
    }

    // ctx.arc(x, y, radius,0,2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
  }
}

export default new Pencil();
