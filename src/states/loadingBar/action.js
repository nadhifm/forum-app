const ActionType = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
};

function showLoadingBarActionCreator(progress) {
  return {
    type: ActionType.SHOW_LOADING,
    payload: {
      loadinBar: progress,
    },
  };
}

function hideLoadingBarActionCreator() {
  return {
    type: ActionType.HIDE_LOADING,
    payload: {
      loadinBar: 0,
    },
  };
}

export { ActionType, showLoadingBarActionCreator, hideLoadingBarActionCreator };
