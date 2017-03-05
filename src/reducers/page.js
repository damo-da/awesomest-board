const initialState = {
  'dialog': '',
  page: 'LOGIN',
};

const drawer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DIALOG': {
      return {...state, dialog: action.dialog}
    }
    case 'CHANGE_PAGE': {
      return {...state, page: action.page}
    }
  }

  return state === undefined? initialState: state;
};

export default drawer;
