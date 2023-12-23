import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';
import useInput from '../hooks/useInput';

function AddThreadrModal({
  show,
  hide,
  addThread,
  isLoading,
}) {
  const [title, onTitleChange, clearTitle] = useInput('');
  const [category, onCategoryChange, clearCategory] = useInput('');
  const [body, onBodyChange, clearBody] = useInput('');

  useEffect(() => {
    clearTitle();
    clearCategory();
    clearBody();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={isLoading ? null : hide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Tambah Diskusi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              type="text"
              placeholder="judul"
              value={title}
              onChange={onTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Control
              type="text"
              placeholder="kategori"
              value={category}
              onChange={onCategoryChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Konten</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="konten"
              value={body}
              onChange={onBodyChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          variant="light"
          onClick={
            isLoading ? null : () => addThread({ title, category, body })
          }
        >
          {isLoading ? 'Loading…' : 'Tambah Diskusi'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddThreadrModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addThread: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default AddThreadrModal;
