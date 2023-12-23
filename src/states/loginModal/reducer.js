import { ActionType } from './action';

function loginModalReducer(loginModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_LOGIN_MODAL:
      return action.payload.loginModal;
    case ActionType.HIDE_LOGIN_MODAL:
      return action.payload.loginModal;
    default:
      return loginModal;
  }
}

export default loginModalReducer;
