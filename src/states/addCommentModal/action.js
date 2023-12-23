const ActionType = {
  SHOW_ADD_COMMENT_MODAL: 'SHOW_ADD_COMMENT_MODAL',
  HIDE_ADD_COMMENT_MODAL: 'HIDE_ADD_COMMENT_MODAL',
};

function showAddCommentModalActionCreator() {
  return {
    type: ActionType.SHOW_ADD_COMMENT_MODAL,
    payload: {
      addCommentModal: true,
    },
  };
}

function hideAddCommentModalActionCreator() {
  return {
    type: ActionType.HIDE_ADD_COMMENT_MODAL,
    payload: {
      addCommentModal: false,
    },
  };
}

export {
  ActionType,
  showAddCommentModalActionCreator,
  hideAddCommentModalActionCreator,
};
