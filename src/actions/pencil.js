export const changedColor = (color) => {
  return {
    type: 'CHANGED_PENCIL_COLOR',
    color: color
  }
};


export const changedSize = (size) => {
  return {
    type: 'CHANGED_PENCIL_SIZE',
    size: size
  }
}
