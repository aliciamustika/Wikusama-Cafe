import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const [showModal, setShowModal] = React.useState(false);

  const navigate = useNavigate();

    const [data, setData] = useState({
        id: 0,
        email: '@gmail.com',
        role: 'Cashier',
        status: 'Active'
    });

    const [editing, setEditing] = useState(true);

    const handleSave = () => {
        setEditing(false);
    };

    const handleCancel = () => {
        navigate('/dataUser');
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>
      {showModal ? (
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="felx w-auto my-6 mx-auto max-w-3xl">
            {/* content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Modal Title</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto">
              {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'id' ? 'ID' : key === 'email' ? 'Email' :
                                key === 'role' ? 'Role' :
                                    'status'}
                        </label>
                        {editing ? (
                            <input
                                type={key === 'tanggal' ? 'date' : 'text'}
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <span className="block p-2 border border-gray-300 rounded bg-gray-100">
                                {value}
                            </span>
                        )}
                    </div>
                ))}
              </div>
              {/* footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;