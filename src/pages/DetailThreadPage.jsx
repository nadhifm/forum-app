import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncAddCommentDetailThread,
  asyncReceiveDetailThread,
  asyncToggleDownVoteCommentDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteCommentDetailThread,
  asyncToggleUpVoteDetailThread,
} from '../states/detailThread/action';
import {
  showAddCommentModalActionCreator,
  hideAddCommentModalActionCreator,
} from '../states/addCommentModal/action';
import DetailThread from '../components/DetailThread';
import CommentDetailThread from '../components/CommentDetailThread';
import AddCommentModal from '../components/AddCommentModal';

function DetailThreadPage() {
  const { id } = useParams();
  const authUser = useSelector((states) => states.authUser);
  const detailThread = useSelector((states) => states.detailThread);
  const loadingBar = useSelector((states) => states.loadingBar);
  const addCommentModal = useSelector((states) => states.addCommentModal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const onUpVoteDetailThread = (threadId) => {
    dispatch(asyncToggleUpVoteDetailThread(threadId));
  };

  const onDownVoteDetailThread = (threadId) => {
    dispatch(asyncToggleDownVoteDetailThread(threadId));
  };

  const onAddCommentDetailThread = (comment) => {
    dispatch(asyncAddCommentDetailThread(comment));
  };

  const onUpVoteCommentDetailThread = (commentThreadId) => {
    dispatch(asyncToggleUpVoteCommentDetailThread(commentThreadId));
  };

  const onDownVoteCommentDetailThread = (commentThreadId) => {
    dispatch(asyncToggleDownVoteCommentDetailThread(commentThreadId));
  };

  const onShowAddCommentModal = () => {
    dispatch(showAddCommentModalActionCreator());
  };

  const onHideAddCommentModal = () => {
    dispatch(hideAddCommentModalActionCreator());
  };

  if (detailThread === null) {
    return null;
  }

  return (
    <>
      <AddCommentModal
        show={addCommentModal}
        hide={onHideAddCommentModal}
        addComment={onAddCommentDetailThread}
        isLoading={loadingBar !== 0}
      />

      <Container className="py-4 mx-auto w-75">
        <h2 className="text-dark">Detail Diskusi</h2>
        <DetailThread
          authUserId={authUser === null ? null : authUser.id}
          id={detailThread.id}
          title={detailThread.title}
          category={detailThread.category}
          body={detailThread.body}
          createdAt={detailThread.createdAt}
          owner={detailThread.owner}
          upVotesBy={detailThread.upVotesBy}
          downVotesBy={detailThread.downVotesBy}
          upVote={onUpVoteDetailThread}
          downVote={onDownVoteDetailThread}
        />
        <CommentDetailThread
          authUserId={authUser === null ? null : authUser.id}
          comments={detailThread.comments}
          showAddCommentModal={onShowAddCommentModal}
          upVoteComment={onUpVoteCommentDetailThread}
          downVoteComment={onDownVoteCommentDetailThread}
        />
      </Container>
    </>
  );
}

export default DetailThreadPage;
