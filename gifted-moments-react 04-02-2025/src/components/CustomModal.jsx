import React from "react";
import { Button, Modal } from "react-bootstrap";

function CustomModal({ show, onHide, title, body, footerButtons = [] }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      scrollable={true}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {footerButtons.map(({ label, variant, onClick }, index) => (
          <Button key={index + 1} variant={variant} onClick={onClick}>
            {label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
