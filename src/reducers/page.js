const initialState = {
  'dialog': '',
  page: 'LOGIN',

  codeForMembers: ''
};

const drawer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DIALOG': {
      return {...state, dialog: action.dialog}
    }
    case 'CHANGE_PAGE': {
      return {...state, page: action.page}
    }
    case 'CHANGE_CREATE_CODE': {
      return {...state, codeForMembers: action.code};
    }
  }

  return state === undefined? initialState: state;
};

export default drawer;
