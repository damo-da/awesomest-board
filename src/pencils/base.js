export default class BasePencil {
  draw(){
    throw new Error('Pencil does not override base draw() method')
  }
}
