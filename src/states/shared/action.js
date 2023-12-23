import api from '../../utils/api';
import { showLoadingBarActionCreator } from '../loadingBar/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(25));
    try {
      const users = await api.getAllUsers();
      dispatch(showLoadingBarActionCreator(50));
      const threads = await api.getAllThreads();
      dispatch(showLoadingBarActionCreator(75));

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

export default asyncPopulateUsersAndThreads;
