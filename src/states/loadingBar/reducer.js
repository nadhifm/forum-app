import { ActionType } from './action';

function loadingBarReducer(loadingBar = 0, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_LOADING:
      return action.payload.loadinBar;
    case ActionType.HIDE_LOADING:
      return action.payload.loadinBar;
    default:
      return loadingBar;
  }
}

export default loadingBarReducer;
