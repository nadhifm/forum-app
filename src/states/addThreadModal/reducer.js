import { ActionType } from './action';

function addThreadModalReducer(addThreadModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_ADD_THREAD_MODAL:
      return action.payload.addThreadModal;
    case ActionType.HIDE_ADD_THREAD_MODAL:
      return action.payload.addThreadModal;
    default:
      return addThreadModal;
  }
}

export default addThreadModalReducer;
