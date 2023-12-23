import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  HandThumbsUp,
  HandThumbsDown,
  ChatSquareDots,
  HandThumbsUpFill,
  HandThumbsDownFill,
} from 'react-bootstrap-icons';
import parser from 'html-react-parser';
import showFormattedDate from '../utils';
import AvatarNameUser from './AvatarNameUser';
import IconText from './IconText';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUserId,
  user,
  upVote,
  downVote,
}) {
  const isUpVote = authUserId === null ? false : upVotesBy.includes(authUserId);
  const isDownVote = authUserId === null ? false : downVotesBy.includes(authUserId);

  return (
    <Card className="my-3">
      <Card.Header style={{ fontWeight: '600' }}>
        <Row>
          <Col xs={6}>
            <AvatarNameUser avatar={user.avatar} name={user.name} />
          </Col>
          <Col
            xs={6}
            className="text-end pt-1"
            style={{ fontWeight: '500', fontSize: '16px' }}
          >
            {showFormattedDate(createdAt)}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title as="h4">
          <Link
            to={`/threads/${id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {title}
          </Link>
        </Card.Title>
        <Card.Text
          as="div"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {parser(body)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Container
          className="p-0"
          style={{ fontWeight: '500', fontSize: '16px' }}
        >
          <Row>
            <Col>{category}</Col>
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
            <Col xs="auto">
              <IconText
                icon={<ChatSquareDots size={20} />}
                text={`${totalComments}`}
              />
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}

ThreadItem.defaultProps = {
  authUserId: null,
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadItem;
