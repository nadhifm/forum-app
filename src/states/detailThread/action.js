import api from '../../utils/api';
import { hideAddCommentModalActionCreator } from '../addCommentModal/action';
import { showLoadingBarActionCreator } from '../loadingBar/action';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
  ADD_COMMENT_DETAIL_THREAD: 'ADD_COMMENT_DETAIL_THREAD',
  TOGGLE_UP_VOTE_COMMENT_DETAIL_THREAD: 'TOGGLE_UP_VOTE_COMMENT_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_COMMENT_DETAIL_THREAD:
    'TOGGLE_DOWN_VOTE_COMMENT_DETAIL_THREAD',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function toggleUpVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function addCommentDetailThreadActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_DETAIL_THREAD,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentDetailThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentDetailThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoadingBarActionCreator(35));
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(showLoadingBarActionCreator(70));
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncToggleUpVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { authUser, detailThread } = getState();
    const userId = authUser.id;
    const threadId = detailThread.id;
    dispatch(toggleUpVoteDetailThreadActionCreator(userId));

    try {
      if (detailThread.upVotesBy.includes(userId)) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
      dispatch(showLoadingBarActionCreator(70));
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteDetailThreadActionCreator(userId));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncToggleDownVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { authUser, detailThread } = getState();
    const userId = authUser.id;
    const threadId = detailThread.id;
    dispatch(toggleDownVoteDetailThreadActionCreator(userId));

    try {
      if (detailThread.downVotesBy.includes(userId)) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
      dispatch(showLoadingBarActionCreator(70));
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteDetailThreadActionCreator(userId));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncAddCommentDetailThread(content) {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { detailThread } = getState();
    const threadId = detailThread.id;

    try {
      const thread = await api.createComment({ threadId, content });
      dispatch(showLoadingBarActionCreator(70));
      dispatch(addCommentDetailThreadActionCreator(thread));
      dispatch(hideAddCommentModalActionCreator());
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncToggleUpVoteCommentDetailThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { authUser, detailThread } = getState();
    const userId = authUser.id;
    const threadId = detailThread.id;
    const selectedComment = detailThread.comments.find((comment) => comment.id === commentId);
    dispatch(toggleUpVoteCommentDetailThreadActionCreator({ commentId, userId }));

    try {
      if (selectedComment.upVotesBy.includes(userId)) {
        await api.neutralizeVoteComment({ threadId, commentId });
      } else {
        await api.upVoteComment({ threadId, commentId });
      }
      dispatch(showLoadingBarActionCreator(70));
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentDetailThreadActionCreator({ commentId, userId }));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

function asyncToggleDownVoteCommentDetailThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoadingBarActionCreator(35));
    const { authUser, detailThread } = getState();
    const userId = authUser.id;
    const threadId = detailThread.id;
    const selectedComment = detailThread.comments.find((comment) => comment.id === commentId);
    dispatch(toggleDownVoteCommentDetailThreadActionCreator({ commentId, userId }));

    try {
      if (selectedComment.downVotesBy.includes(userId)) {
        await api.neutralizeVoteComment({ threadId, commentId });
      } else {
        await api.downVoteComment({ threadId, commentId });
      }
      dispatch(showLoadingBarActionCreator(70));
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentDetailThreadActionCreator({ commentId, userId }));
    }
    dispatch(showLoadingBarActionCreator(100));
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  toggleUpVoteDetailThreadActionCreator,
  toggleDownVoteDetailThreadActionCreator,
  addCommentDetailThreadActionCreator,
  toggleUpVoteCommentDetailThreadActionCreator,
  toggleDownVoteCommentDetailThreadActionCreator,
  asyncReceiveDetailThread,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncAddCommentDetailThread,
  asyncToggleUpVoteCommentDetailThread,
  asyncToggleDownVoteCommentDetailThread,
};
