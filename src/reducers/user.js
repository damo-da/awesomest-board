const initialState = {
  members: [],
  currentUserId: -1,
  sess_token: ''
};

const drawer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_MEMBER': {
      const newState = {...state};
      newState.members.push(action.member);
      return newState;
    }

    case 'SAVE_TOKEN': {
      return {...state, sess_token:action.sess_token}
    }

    case 'SAVE_USER_ID': {
      return {...state, currentUserId:action.currentUserId}
    }

    default:{
      return state
    }

  }
};

export default drawer;
