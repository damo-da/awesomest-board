const initialState = {
  open: false,
  text: ''
};

export const snackBar = (state = initialState, action) => {
  switch (action.type){
    case 'OPEN_SNACK_BAR': {
      return {...state, open: true, text: action.text};
    }
    case 'HIDE_SNACK_BAR': {
      return {...state, open: false};
    }
  }

  return state===undefined?initialState:state;
};

export default snackBar;
