import BasePencil from '../base';

class Pencil extends BasePencil {
  draw(ctx, data) {
    const width = data.size;
    const height = data.size;

    const {x, y} = data;

    ctx.fillStyle = data.color;
    ctx.fillRect(x, y, width, height);
  }
}

export default new Pencil();
