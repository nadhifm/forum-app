import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoadingBarActionCreator } from '../loadingBar/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(35));
    try {
      const authUser = await api.getOwnProfile();
      dispatch(showLoadingBarActionCreator(70));
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
