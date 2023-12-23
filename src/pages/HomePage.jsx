import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import AddThreadModal from '../components/AddThreadModal';
import {
  asyncAddThread,
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';
import {
  hideAddThreadModalActionCreator,
  showAddThreadModalActionCreator,
} from '../states/addThreadModal/action';
import LeaderboardsList from '../components/LeaderboardsList';
import ThreadsList from '../components/ThreadsList';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const leaderboards = useSelector((states) => states.leaderboards);
  const addThreadModal = useSelector((states) => states.addThreadModal);
  const loadingBar = useSelector((states) => states.loadingBar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  const onUpVoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onShowAddThreadModal = () => {
    dispatch(showAddThreadModalActionCreator());
  };

  const onHideAddThreadModal = () => {
    dispatch(hideAddThreadModalActionCreator());
  };

  if (threads === null || leaderboards === null) {
    return null;
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <>
      <AddThreadModal
        show={addThreadModal}
        hide={onHideAddThreadModal}
        addThread={onAddThread}
        isLoading={loadingBar !== 0}
      />

      <Container className="py-4">
        <Row>
          <Col xl={9}>
            <ThreadsList
              threads={threadList}
              authUserId={authUser === null ? null : authUser.id}
              showAddThreadModel={onShowAddThreadModal}
              upVote={onUpVoteThread}
              downVote={onDownVoteThread}
            />
          </Col>
          <Col xl={3}>
            <LeaderboardsList leaderboards={leaderboards} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
