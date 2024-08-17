import React from "react";

const Dialog = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg w-[75%] max-w-full h-auto max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            X
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
        {/* Uncomment this section if you need a submit button */}
        {/* <div className="flex justify-end p-4 border-t">
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div> */}
      </div>
    </div>
  </>
  
  );
};

export default Dialog;