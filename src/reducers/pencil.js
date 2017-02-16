const initialState = {
  size: 10,
  pencil: 'DEFAULT',
  color: '#f44336'
};

const pencil = (state = initialState, action) => {

  switch(action.type){
    case 'CHANGED_PENCIL_COLOR': {
      return {...state, color:action.color}
    }
    case 'CHANGED_PENCIL_SIZE': {
      return {...state, size: action.size}
    }
    default:{
      return {...state}
    }

  }
};

export default pencil;
