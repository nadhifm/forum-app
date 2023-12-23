import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import AvatarNameUser from './AvatarNameUser';

function UserScore({ avatar, name, score }) {
  return (
    <Container className="p-0">
      <Row>
        <Col>
          <AvatarNameUser avatar={avatar} name={name} />
        </Col>
        <Col
          xs="auto"
          className="text-end pt-1"
          style={{ fontWeight: '500', fontSize: '16px' }}
        >
          {score}
        </Col>
      </Row>
    </Container>
  );
}

UserScore.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default UserScore;
