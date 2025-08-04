import React from 'react'
import ReactDOM from 'react-dom';
import { IoClose } from "react-icons/io5";
const Modal = ({isOpen,onClose,children,darkMode}) => {
  if(!isOpen) return null;
  return ReactDOM.createPortal(
   <div className="fixed inset-0 flex justify-center items-center z-50 bg-[#12161C] bg-opacity-70">
    <div className="">
      <button className="absolute top-20 right-16" onClick={onClose}>
      <IoClose size={24} color="red" />
      </button>
    
      <div className={`${darkMode ? 'bg-[#191F2B] max-w-lg mx-auto mt-10 p-8 rounded-lg' : 'bg-white max-w-lg mx-auto mt-10 p-8 border border-[#E0E0E0] rounded-xl shadow-xl'}`}
      >
        {children}
      </div>
      
    </div>
   </div>,
    document.body
  );
};

export default Modal
