import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';
import useInput from '../hooks/useInput';

function RegisterModal({
  show,
  hide,
  register,
  isLoading,
}) {
  const [name, onNameChange, clearName] = useInput('');
  const [email, onEmailChange, clearEmail] = useInput('');
  const [password, onPasswordChange, clearPassword] = useInput('');

  useEffect(() => {
    clearName();
    clearEmail();
    clearPassword();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={isLoading ? null : hide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="nama"
              value={name}
              onChange={onNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          variant="light"
          onClick={isLoading ? null : () => register({ name, email, password })}
        >
          {isLoading ? 'Loading…' : 'Register'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RegisterModal;
