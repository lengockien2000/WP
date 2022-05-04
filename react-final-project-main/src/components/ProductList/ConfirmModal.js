/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Modal, Button } from '@ahaui/react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

function ConfirmModal({ onConfirm, message, content, onHide }) {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal show size="small" onHide={onHide} transition="">
      <Helmet>
        <title>Deleting product from Leo's store</title>
        <meta name="description" content="Deleting product from Leo's store" />
      </Helmet>
      <Modal.Header>
        <ModalTitle>{message}</ModalTitle>
      </Modal.Header>
      <ModalBody>{content}</ModalBody>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} width="full">
          Cancel
        </Button>
        <Button variant="negative" onClick={handleConfirm} width="full">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const ModalTitle = styled(Modal.Title)`
  color: var(--modal-text-color) !important;
`;

const ModalBody = styled(Modal.Body)`
  text-align: center;
  color: var(--modal-text-color) !important;
`;

export default ConfirmModal;
