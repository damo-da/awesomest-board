const initialState = {
    members: [
      {'name': 'Sinestro', admin: false, id: 101},
      {'name': 'Hal Jordan', admin: false, id: 100},
      {'name': 'Louis Lane', admin: false, id: 10},
      {'name': 'Bruce Wayne', admin: false, id: 1},
      {'name': 'Barry Allen', admin: false, id: 3},
      {'name': 'Goku', admin: true, id: 100000}
    ],
    currentUserId: 100000
};

const drawer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_MEMBER': {
      const newState = {...state};
      newState.members.push(action.member);
      return newState;
    }

    default:{
      return state
    }

  }
};

export default drawer;
