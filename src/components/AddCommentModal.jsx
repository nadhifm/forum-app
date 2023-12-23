import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';
import useInput from '../hooks/useInput';

function AddThreadModal({
  show,
  hide,
  addComment,
  isLoading,
}) {
  const [comment, onCommentChange, clearComment] = useInput('');

  useEffect(() => {
    clearComment();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={isLoading ? null : hide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Tulis Komentar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="komentar"
              value={comment}
              onChange={onCommentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          variant="light"
          onClick={isLoading ? null : () => addComment(comment)}
        >
          {isLoading ? 'Loading…' : 'Tulis Komentar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddThreadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default AddThreadModal;
