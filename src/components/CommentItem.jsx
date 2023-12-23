import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import {
  HandThumbsUp,
  HandThumbsDown,
  HandThumbsUpFill,
  HandThumbsDownFill,
} from 'react-bootstrap-icons';
import parser from 'html-react-parser';
import IconText from './IconText';
import AvatarNameUser from './AvatarNameUser';
import showFormattedDate from '../utils';

function CommentItem({
  authUserId,
  id,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  upVote,
  downVote,
}) {
  const isUpVote = authUserId === null ? false : upVotesBy.includes(authUserId);
  const isDownVote = authUserId === null ? false : downVotesBy.includes(authUserId);
  return (
    <Container>
      <Col>
        <Row>
          <Col className="px-0">
            <AvatarNameUser avatar={owner.avatar} name={owner.name} />
          </Col>
          <Col
            xs="auto"
            className="text-end pt-1"
            style={{ fontWeight: '500', fontSize: '16px' }}
          >
            {showFormattedDate(createdAt)}
          </Col>
        </Row>
        <Row className="py-2">{parser(content)}</Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            <IconText
              icon={
                isUpVote ? (
                  <HandThumbsUpFill size={20} />
                ) : (
                  <HandThumbsUp size={20} />
                )
              }
              text={`${upVotesBy.length}`}
              iconClick={authUserId === null ? null : () => upVote(id)}
            />
          </Col>
          <Col xs="auto">
            <IconText
              icon={
                isDownVote ? (
                  <HandThumbsDownFill size={20} />
                ) : (
                  <HandThumbsDown size={20} />
                )
              }
              text={`${downVotesBy.length}`}
              iconClick={authUserId === null ? null : () => downVote(id)}
            />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

CommentItem.defaultProps = {
  authUserId: null,
};

CommentItem.propTypes = {
  authUserId: PropTypes.string,
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentItem;
