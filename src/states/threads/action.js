import api from '../../utils/api';
import { hideAddThreadModalActionCreator } from '../addThreadModal/action';
import { showLoadingBarActionCreator } from '../loadingBar/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(35));
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(showLoadingBarActionCreator(70));
      dispatch(addThreadActionCreator(thread));
      dispatch(hideAddThreadModalActionCreator());
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { authUser, threads } = getState();
    const userId = authUser.id;
    const selectedThread = threads.find((thread) => thread.id === threadId);
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId }));

    try {
      if (selectedThread.upVotesBy.includes(userId)) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
      dispatch(showLoadingBarActionCreator(70));
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId }));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { authUser, threads } = getState();
    const userId = authUser.id;
    const selectedThread = threads.find((thread) => thread.id === threadId);
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId }));

    try {
      if (selectedThread.downVotesBy.includes(userId)) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
      dispatch(showLoadingBarActionCreator(70));
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId }));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
