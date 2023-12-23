import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';
import CommentItem from './CommentItem';

function CommentDetailThread({
  authUserId,
  comments,
  showAddCommentModal,
  upVoteComment,
  downVoteComment,
}) {
  return (
    <Card className="pb-2">
      <Card.Header style={{ fontWeight: 'bold', fontSize: '20px' }}>
        <Container className="p-0">
          <Row>
            <Col>{`Komentar (${comments.length})`}</Col>
            <Col xs="auto">
              {authUserId === null ? (
                null
              ) : (
                <Button
                  variant="light"
                  className="m-2"
                  size="sm"
                  onClick={showAddCommentModal}
                >
                  Tulis Komentar
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <ListGroup variant="flush">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <CommentItem
              authUserId={authUserId}
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              upVotesBy={comment.upVotesBy}
              downVotesBy={comment.downVotesBy}
              owner={comment.owner}
              upVote={upVoteComment}
              downVote={downVoteComment}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

CommentDetailThread.defaultProps = {
  authUserId: null,
};

CommentDetailThread.propTypes = {
  authUserId: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  showAddCommentModal: PropTypes.func.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
};

export default CommentDetailThread;
