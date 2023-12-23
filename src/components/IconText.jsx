import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function IconText({ icon, text, iconClick }) {
  return (
    <Container className="p-0">
      <Row xs="auto">
        <Col
          xs="auto"
          className="ps-1 pe-2"
          onClick={iconClick}
          style={iconClick !== undefined ? { cursor: 'pointer' } : {}}
        >
          {icon}
        </Col>
        <Col xs="auto" className="ps-0">
          {text}
        </Col>
      </Row>
    </Container>
  );
}

IconText.defaultProps = {
  iconClick: () => {},
};

IconText.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  iconClick: PropTypes.func,
};

export default IconText;
