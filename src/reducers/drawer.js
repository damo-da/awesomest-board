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

      const newState = {...state, page: action.page};

      //change page title
      if(newState.page == "DEFAULT")newState.title = initialState.title;
      else if(newState.page == 'MEMBERS') newState.title = "Members";
      else if(newState.page == "PENCIL") newState.title = "Pencil";
      else if(newState.page == "LOGIN") newState.title = "Login";

      return newState;
    }
    case 'CHANGE_PAGE_TITLE': {
      return {...state, title: action.title}
    }

  }
};

export default drawer;
