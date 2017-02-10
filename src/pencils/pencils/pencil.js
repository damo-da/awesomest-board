import BasePencil from '../base';


class Pencil extends BasePencil {
  static SIZE_CONST = 0.5;

  draw(ctx, data) {
    const {x, y} = data;

    const radius = data.size * Pencil.SIZE_CONST;

    ctx.fillStyle = data.color;
    ctx.strokeStyle  = data.color;

    console.log(radius, data.size)
    ctx.beginPath();
    ctx.lineWidth=radius/2.0;
    ctx.arc(x, y, radius,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}

export default new Pencil();
