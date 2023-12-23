const ActionType = {
  SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL',
  HIDE_LOGIN_MODAL: 'HIDE_LOGIN_MODAL',
};

function showLoginModalActionCreator() {
  return {
    type: ActionType.SHOW_LOGIN_MODAL,
    payload: {
      loginModal: true,
    },
  };
}

function hideLoginModalActionCreator() {
  return {
    type: ActionType.HIDE_LOGIN_MODAL,
    payload: {
      loginModal: false,
    },
  };
}

export { ActionType, showLoginModalActionCreator, hideLoginModalActionCreator };
