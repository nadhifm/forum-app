import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailThreadPage from './pages/DetailThreadPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './states/authUser/action';
import LoginModal from './components/LoginModal';
import {
  hideLoginModalActionCreator,
  showLoginModalActionCreator,
} from './states/loginModal/action';
import {
  hideRegisterModalActionCreator,
  showRegisterModalActionCreator,
} from './states/registerModal/action';
import RegisterModal from './components/RegisterModal';
import { asyncRegisterUser } from './states/users/action';
import { hideLoadingBarActionCreator } from './states/loadingBar/action';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const loginModal = useSelector((states) => states.loginModal);
  const registerModal = useSelector((states) => states.registerModal);
  const loadingBar = useSelector((states) => states.loadingBar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onShowLoginModal = () => {
    dispatch(showLoginModalActionCreator());
  };

  const onHideLoginModal = () => {
    dispatch(hideLoginModalActionCreator());
  };

  const onShowRegisterModal = () => {
    dispatch(showRegisterModalActionCreator());
  };

  const onHideRegisterModal = () => {
    dispatch(hideRegisterModalActionCreator());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <LoginModal
        show={loginModal}
        hide={onHideLoginModal}
        login={onLogin}
        isLoading={loadingBar !== 0}
      />
      <RegisterModal
        show={registerModal}
        hide={onHideRegisterModal}
        register={onRegister}
        isLoading={loadingBar !== 0}
      />
      <div>
        <header>
          <LoadingBar
            color="#28B485"
            progress={loadingBar}
            onLoaderFinished={() => dispatch(hideLoadingBarActionCreator())}
          />
          <Navigation
            authUserId={authUser === null ? null : authUser.id}
            login={onShowLoginModal}
            register={onShowRegisterModal}
            logout={onLogout}
          />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailThreadPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
