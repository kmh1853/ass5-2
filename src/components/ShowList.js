import React, { useState } from "react";
import myData from "../my_data.json";
import ModalComponent from "./ModalComponent";

const ShowList = () => {
  const [music, setMusic] = useState(myData.music);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const handleAdd = async (newData) => {
    const newMusic = { id: Date.now().toString(), ...newData };

    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMusic),
      });

      if (response.ok) {
        setMusic([...music, newMusic]);
      } else {
        console.error("Failed to add music");
      }
    } catch (error) {
      console.error("Error adding music:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    // 서버에 데이터 수정 요청 (PUT)
    try {
      const response = await fetch(`/api/music/${updatedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setMusic(music.map((item) => (item.id === updatedData.id ? updatedData : item)));
      } else {
        console.error("Failed to update music");
      }
    } catch (error) {
      console.error("Error updating music:", error);
    }
  };

  const handleAddModal = () => {
    setIsEdit(false);
    setCurrentData(null);
    setShowModal(true);
  };

  const handleEditModal = (data) => {
    setIsEdit(true);
    setCurrentData(data);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // 서버에 데이터 삭제 요청 (DELETE)
    try {
      const response = await fetch(`/api/music/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMusic(music.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete music");
      }
    } catch (error) {
      console.error("Error deleting music:", error);
    }
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
