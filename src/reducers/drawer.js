const initialState = {
  'open': false,
  'page': 'default',
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

  }
};

export default drawer;
