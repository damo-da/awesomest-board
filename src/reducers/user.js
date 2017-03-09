const initialState = {
    members: [
    ],
    currentUserId: -1,
};

const drawer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_MEMBER': {
      const newState = {...state};
      newState.members.push(action.member);
      return newState;
    }

    case 'SAVE_TOKEN': {
      const newState = {...state};
      newState.members.find((x) => x.id == newState.currentUserId).sess_token = action.sess_token;
      return newState;
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
