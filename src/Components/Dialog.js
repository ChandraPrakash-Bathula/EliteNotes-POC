import React from "react";

const Dialog = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 md:h-screen lg:h-screen h-[70%] pt-12">
      <div className="bg-white rounded-lg shadow-lg px-6 pt-12 lg:h-3/4 md:h-3/4 h-[90%] text-ellipsis w-3/2 max-w-3/4 overflow-y-auto">
        <div className="flex justify-between sticky">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 m-2 rounded-md"
          >
           X
          </button>
        </div>
        <div className="mb-4 lg:h-3/4 md:h-3/4 h-[76%] text-ellipsis overflow-y-auto">{children}</div>
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