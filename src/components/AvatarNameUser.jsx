import React from 'react';
import {
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function AvatarNameUser({ avatar, name }) {
  return (
    <Container className="p-0" style={{ fontWeight: '500', fontSize: '16px' }}>
      <Row>
        <Col xs="auto">
          <Image src={avatar} roundedCircle width="32" height="32" />
        </Col>
        <Col className="p-0 pt-1">{name}</Col>
      </Row>
    </Container>
  );
}

AvatarNameUser.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AvatarNameUser;
