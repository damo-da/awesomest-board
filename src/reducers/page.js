const initialState = {
  'dialog': ''
};

const drawer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DIALOG': {
      return {...state, dialog: action.dialog}
    }
  }

  return state === undefined? initialState: state;
};

export default drawer;
