import React from "react";

const Dialog = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-3/4">
        <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 m-2 rounded-md"
          >
           X
          </button>
        </div>
        <div className="mb-4">{children}</div>
        {/* <div className="flex justify-end space-x-4">
        
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Dialog;