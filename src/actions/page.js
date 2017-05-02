export const showDialog = (name) => {
  return {
    type: 'OPEN_DIALOG',
    dialog: name
  };
};

export const changePage = (name) => {
  return {
    type: 'CHANGE_PAGE',
    page: name
  };
};


export const changeCreateCode = (code) => {
  return {
    type: 'CHANGE_CREATE_CODE',
    code
  };
};

export const handlePhoneChange = (phoneNumber) => {
  return {
    type: 'PHONE_NUMBER',
    phoneNumber: phoneNumber
  };
};
