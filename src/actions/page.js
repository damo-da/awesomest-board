export const showDialog = (name) => {
  return {
    type: 'OPEN_DIALOG',
    dialog: name
  }
};

export const changePage = (name) => {
  return {
    type: 'CHANGE_PAGE',
    page: name
  }
};
