import React from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({
  authUserId,
  login,
  register,
  logout,
}) {
  return (
    <Navbar bg="dark" expand="md">
      <Container>
        <Navbar.Brand data-cy="navbar-brand">
          <Link
            to="/"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Forum App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {authUserId === null ? (
            <Nav className="ms-auto">
              <Button variant="outline-light" className="m-2" onClick={login} data-cy="navbar-login-button">
                Login
              </Button>
              <Button variant="light" className="m-2" onClick={register}>
                Register
              </Button>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Button variant="outline-light" className="m-2" onClick={logout} data-cy="navbar-logout-button">
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Navigation.defaultProps = {
  authUserId: null,
};

Navigation.propTypes = {
  authUserId: PropTypes.string,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navigation;
