export default class BasePencil {
  draw(ctx, data){
    throw new Error("Pencil does not override base draw() method")
  }

};
