import React, { useState } from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null; // Only render if modal is open

  return (
    <div className="modal ">
      <div className="modal-content ">
        {children} {/* Content to be displayed inside the modal */}

      </div>
    </div>
  );
};

export default Modal;
