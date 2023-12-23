import { ActionType } from './action';

function registerModalReducer(registerModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_REGISTER_MODAL:
      return action.payload.registerModal;
    case ActionType.HIDE_REGISTER_MODAL:
      return action.payload.registerModal;
    default:
      return registerModal;
  }
}

export default registerModalReducer;
