import api from '../../utils/api';
import { showLoadingBarActionCreator } from '../loadingBar/action';
import { showLoginModalActionCreator } from '../loginModal/action';
import { hideRegisterModalActionCreator } from '../registerModal/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(35));
    try {
      await api.register({ name, email, password });
      dispatch(showLoadingBarActionCreator(70));
      dispatch(hideRegisterModalActionCreator());
      dispatch(showLoginModalActionCreator());
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
