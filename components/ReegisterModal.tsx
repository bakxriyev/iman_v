import React from 'react';
import RegistrationForm from './RegistrationForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (data: { name: string; phone: string }) => {
    console.log('Form data submitted:', data);
    // Modal yopilishi RegistrationForm ichida bajariladi
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <RegistrationForm  
          isModal={true}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;