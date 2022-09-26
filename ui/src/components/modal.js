import React from 'react';
import ReactModal from 'react-modal';

export const Modal = ({ children, ...rest }) => (
  <ReactModal
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-full w-96 max-h-full rounded shadow p-2"
    overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    bodyOpenClassName="overflow-hidden"
    htmlOpenClassName="overflow-hidden"
    {...rest}
  >
    {children}
  </ReactModal>
);

export const ModalHeader = ({ children, onClose }) => (
  <div className="flex flex-row justify-between border-b border-gray-100">
    <span className="font-bold text-gray-700 text-lg">
      {children}
    </span>
    <i className="fa fa-times-circle" onClick={onClose} />
  </div>
);

export const ModalFooter = ({ children }) => (
  <div className="flex flex-row justify-end">
    {children}
  </div>
);

export default Modal;
