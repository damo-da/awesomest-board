const initialState = {
  'open': false,
  'page': 'DEFAULT',
  'title': 'Awesome-est Board Ever!'
};

const drawer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':{
      return {...state, open: !state.open}
    }
    case 'CLOSE_DRAWER': {
      return {...state, open: false}

    }
    case 'CHANGE_PAGE': {
      return {...state, page: action.page}
    }
    case 'CHANGE_PAGE_TITLE': {
      return {...state, title: action.title}
    }

  }
};

export default drawer;
