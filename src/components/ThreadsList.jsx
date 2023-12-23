import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import ThreadItem from './ThreadItem';

function ThreadsList({
  threads,
  authUserId,
  showAddThreadModel,
  upVote,
  downVote,
}) {
  return (
    <>
      <Container className="p-0">
        <Row>
          <Col>
            <h2 className="text-dark">Diskusi Terbaru</h2>
          </Col>
          <Col xs="auto">
            {authUserId === null ? (
              null
            ) : (
              <Button
                variant="dark"
                className="m-2"
                onClick={showAddThreadModel}
                data-cy="show-add-thread-modal-button"
              >
                Tambah Diskusi
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          authUserId={authUserId}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
          user={thread.user}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </>
  );
}

ThreadsList.defaultProps = {
  authUserId: null,
};

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  authUserId: PropTypes.string,
  showAddThreadModel: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadsList;
