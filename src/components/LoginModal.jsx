import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';
import useInput from '../hooks/useInput';

function LoginModal({
  show,
  hide,
  login,
  isLoading,
}) {
  const [email, onEmailChange, clearEmail] = useInput('');
  const [password, onPasswordChange, clearPassword] = useInput('');

  useEffect(() => {
    clearEmail();
    clearPassword();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={isLoading ? null : hide}
      backdrop="static"
      keyboard={false}
      data-cy="login-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={onEmailChange}
              data-cy="login-email-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={onPasswordChange}
              data-cy="login-password-input"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          variant="light"
          onClick={isLoading ? null : () => login({ email, password })}
          data-cy="login-button"
        >
          {isLoading ? 'Loading…' : 'Login'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoginModal;
