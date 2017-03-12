export const addMember = (admin, userId, name='')=>{
  return {
    type: 'ADD_MEMBER',
    member: {
      admin,
      userId,
      name
    }
  }

};

export const changeUserId = (id) => {
  return {
    type: 'SAVE_USER_ID',
    currentUserId: id
  }
};

export const replaceMembers = (members) => {
  return {
    type: 'REPLACE_MEMBERS',
    members
  }
};

export const setToken = (token) => {
  return {
    type: 'SAVE_TOKEN',
    sess_token: token
  }
};

export const setName = (name, userId=null) => {
  return {
    type: 'SET_NAME',
    name: name,
    userId: userId
  }
};
