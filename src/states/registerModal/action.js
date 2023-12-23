const ActionType = {
  SHOW_REGISTER_MODAL: 'SHOW_REGISTER_MODAL',
  HIDE_REGISTER_MODAL: 'HIDE_REGISTER_MODAL',
};

function showRegisterModalActionCreator() {
  return {
    type: ActionType.SHOW_REGISTER_MODAL,
    payload: {
      registerModal: true,
    },
  };
}

function hideRegisterModalActionCreator() {
  return {
    type: ActionType.HIDE_REGISTER_MODAL,
    payload: {
      registerModal: false,
    },
  };
}

export {
  ActionType,
  showRegisterModalActionCreator,
  hideRegisterModalActionCreator,
};
