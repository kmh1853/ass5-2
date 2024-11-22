import React, { useState, useEffect } from "react";
import ModalComponent from "./ModalComponent";

const ShowList = () => {
  const [music, setMusic] = useState([]); // 음악 데이터 목록
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [isEdit, setIsEdit] = useState(false); // 수정 모드 여부
  const [currentData, setCurrentData] = useState(null); // 현재 수정 중인 데이터

  // 음악 목록 불러오기
  useEffect(() => {
    fetch("http://localhost:3001/music")
      .then((response) => response.json())
      .then((data) => setMusic(data))
      .catch((error) => console.error("Error fetching music:", error));
  }, []);

  // 음악 추가
  const handleAdd = async (newData) => {
    try {
      const response = await fetch("http://localhost:3001/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const addedData = await response.json();
        setMusic((prev) => [...prev, addedData]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding music:", error);
    }
  };

  // 음악 수정
  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:3001/music/${updatedData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setMusic((prev) =>
          prev.map((item) => (item.id === updatedData.id ? updatedData : item))
        );
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating music:", error);
    }
  };

  // 음악 삭제
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/music/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMusic((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  // 추가 모달 열기
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentData(null);
    setShowModal(true);
  };

  // 수정 모달 열기
  const openEditModal = (data) => {
    setIsEdit(true);
    setCurrentData(data);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1>음악 목록</h1>
      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        음악 추가
      </button>
      <div className="row">
        {music.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>
                  <strong>가수:</strong> {item.artist}
                  <br />
                  <strong>연도:</strong> {item.year}
                  <br />
                  <strong>장르:</strong> {item.genre}
                </p>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => openEditModal(item)}
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
      {showModal && (
        <ModalComponent
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={isEdit ? handleUpdate : handleAdd}
          data={currentData}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default ShowList;
