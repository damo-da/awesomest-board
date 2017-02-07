export const changePageAction = (page) => {
  return {
    type: 'CHANGE_PAGE',
    page: page
  }
};

export const changePageTitle = (title) => {
  return {
    type: 'CHANGE_PAGE_TITLE',
    title: title
  }
};
