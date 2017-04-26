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
};

export const toggleEraser = () => {
  return {
    type: 'TOGGLE_ERASER'
  }
};

export const changeBrushType = (type) => {
  return {
    type: 'CHANGE_BRUSH_TYPE',
    brushType: type
  }
};

