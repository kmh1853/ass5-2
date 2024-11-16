import React, { useState } from "react";
import myData from "../my_data.json";
import ModalComponent from "./ModalComponent";

const ShowList = () => {
  const [music, setMusic] = useState(myData.music);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  // Add new data
  const handleAdd = (newData) => {
    setMusic([...music, { id: Date.now().toString(), ...newData }]);
  };

  // Update existing data
  const handleUpdate = (updatedData) => {
    setMusic(music.map((item) => (item.id === updatedData.id ? updatedData : item)));
  };

  // Open modal for adding
  const handleAddModal = () => {
    setIsEdit(false);
    setCurrentData(null);
    setShowModal(true);
  };

  // Open modal for editing
  const handleEditModal = (data) => {
    setIsEdit(true);
    setCurrentData(data);
    setShowModal(true);
  };

  // Delete data
  const handleDelete = (id) => {
    setMusic(music.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">음악 정보 CRUD</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddModal}>
        음악 추가
      </button>

      <div className="row">
        {music.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  <strong>가수:</strong> {item.artist} <br />
                  <strong>연도:</strong> {item.year} <br />
                  <strong>장르:</strong> {item.genre}
                </p>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEditModal(item)}
                >
                  수정
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <ModalComponent
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={isEdit ? handleUpdate : handleAdd}
        data={currentData}
        isEdit={isEdit}
      />
    </div>
  );
};

export default ShowList;
