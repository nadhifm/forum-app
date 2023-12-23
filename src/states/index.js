import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import detailThreadReducer from './detailThread/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import loadingBarReducer from './loadingBar/reducer';
import loginModalReducer from './loginModal/reducer';
import registerModalReducer from './registerModal/reducer';
import addThreadModalReducer from './addThreadModal/reducer';
import addCommentModalReducer from './addCommentModal/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardsReducer,
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    addThreadModal: addThreadModalReducer,
    addCommentModal: addCommentModalReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
