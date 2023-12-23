import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';
import UserScore from './UserScore';

function LeaderboardsList({ leaderboards }) {
  return (
    <Card className="mt-3 pb-2">
      <Card.Header style={{ fontWeight: 'bold', fontSize: '20px' }}>
        Klasemen Pengguna Aktif
      </Card.Header>
      <ListGroup variant="flush">
        <Container
          className="px-3 pt-2 pb-3"
          style={{ fontWeight: '600', fontSize: '18px' }}
        >
          <Row>
            <Col>Pengguna</Col>
            <Col className="text-end">Skor</Col>
          </Row>
        </Container>
        {leaderboards.map((leaderboard) => (
          <ListGroup.Item key={leaderboard.user.id}>
            <UserScore
              avatar={leaderboard.user.avatar}
              name={leaderboard.user.name}
              score={leaderboard.score}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default LeaderboardsList;
