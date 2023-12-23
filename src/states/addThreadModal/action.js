const ActionType = {
  SHOW_ADD_THREAD_MODAL: 'SHOW_ADD_THREAD_MODAL',
  HIDE_ADD_THREAD_MODAL: 'HIDE_ADD_THREAD_MODAL',
};

function showAddThreadModalActionCreator() {
  return {
    type: ActionType.SHOW_ADD_THREAD_MODAL,
    payload: {
      addThreadModal: true,
    },
  };
}

function hideAddThreadModalActionCreator() {
  return {
    type: ActionType.HIDE_ADD_THREAD_MODAL,
    payload: {
      addThreadModal: false,
    },
  };
}

export {
  ActionType,
  showAddThreadModalActionCreator,
  hideAddThreadModalActionCreator,
};
