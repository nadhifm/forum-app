import { ActionType } from './action';

function addCommentModalReducer(addCommentModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_ADD_COMMENT_MODAL:
      return action.payload.addCommentModal;
    case ActionType.HIDE_ADD_COMMENT_MODAL:
      return action.payload.addCommentModal;
    default:
      return addCommentModal;
  }
}

export default addCommentModalReducer;
