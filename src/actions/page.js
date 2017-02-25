export const showDialog = (name) => {
  return {
    type: 'OPEN_DIALOG',
    dialog: name
  }
};
