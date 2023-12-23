import api from '../../utils/api';
import { showLoadingBarActionCreator } from '../loadingBar/action';
import { hideLoginModalActionCreator } from '../loginModal/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(25));
    try {
      const token = await api.login({ email, password });
      dispatch(showLoadingBarActionCreator(50));
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(showLoadingBarActionCreator(75));

      dispatch(setAuthUserActionCreator(authUser));
      dispatch(hideLoginModalActionCreator());
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
