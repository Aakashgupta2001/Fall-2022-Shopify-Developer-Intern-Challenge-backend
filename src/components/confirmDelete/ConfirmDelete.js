import React, { Fragment, useEffect, useState } from "react";

const ConfirmDelete = ({ onCancel, onSubmit }) => {
  const [deleteText, setDeleteText] = useState("");

  const handleDeleteText= (e) => {
    setDeleteText(e.target.value);
  }
  return (
    <Fragment>
      <div onClick={onCancel} className="fixed inset-0 bg-black opacity-50" />
      <div className="fixed top-0 left-0 w-full px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0" />
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="mt-4 md:mt-0 md:ml-6 w-full text-center md:text-left">
              <p className="font-bold text-center ">Delete Product</p>
            </div>
          </div>
          <span className="w-3/4 ">
            <label htmlFor="deleteText" className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">Delete Message: </label>
            <input 
            type="text" id="deleteText" 
            onChange={handleDeleteText}
            value={deleteText}
            className="block md:mt-0 md:ml-6  px-4 py-2  mt-2 mb-4 border rounded-lg" />
          </span>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1 bg-red-200 text-red-700 mr-2"
              onClick={()=>onSubmit(deleteText)}
            >
              Delete Product
            </button>
            <button
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmDelete;
