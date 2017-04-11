import C from '../constants';

const initialState = {
  size: 10,
  type: 'PENCIL',
  color: '#f44336'
};

let lastPencilColor = initialState.color;
let lastBrushType = initialState.type;

const pencil = (state = initialState, action) => {

  switch (action.type) {
    case 'CHANGED_PENCIL_COLOR': {
      return {...state, color: action.color}
    }
    case 'CHANGED_PENCIL_SIZE': {
      return {...state, size: action.size}
    }
    case 'TOGGLE_ERASER': {
      if (state.type == 'ERASER') {
        return {...state, type: lastBrushType, color: lastPencilColor};
      } else {
        lastPencilColor = state.color;
        lastBrushType = state.type;
        return {...state, type: 'ERASER', color: C.ERASER_HEX};
      }

    }

    case 'CHANGE_BRUSH_TYPE': {
      console.log('changing brush type', state, action);
      if(action.brushType == 'ERASER'){
        console.log('type is eraser');
        if(state.type == 'ERASER') //wants to change from eraser to eraser. do nothing
          return state;

        console.log('toggling eraser');
        // change to eraser otherwise.
        return pencil(state, {type: 'TOGGLE_ERASER'});
      }else{
        console.log('changing to something else');
        if(state.type == 'ERASER'){
          lastBrushType = action.brushType;
          return pencil(state, {type: 'TOGGLE_ERASER'})
        }else{
          return {...state, type: action.brushType};

        }
      }

    }
  }

  return state;
};

export default pencil;
