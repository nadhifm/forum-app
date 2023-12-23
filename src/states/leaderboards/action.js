import api from '../../utils/api';
import { showLoadingBarActionCreator } from '../loadingBar/action';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(35));
    try {
      const leaderboars = await api.getLeaderboards();
      dispatch(showLoadingBarActionCreator(70));
      dispatch(receiveLeaderboardsActionCreator(leaderboars));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};
