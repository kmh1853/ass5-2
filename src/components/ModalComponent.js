import React, { useState, useEffect, useRef } from "react";

const ModalComponent = ({ show, onClose, onSave, data, isEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    genre: "",
  });

  const titleRef = useRef();

  useEffect(() => {
    if (data) {
      setFormData(data); // 기존 데이터가 있으면 로드
    } else {
      setFormData({ title: "", artist: "", year: "", genre: "" }); // 초기화
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // 유효성 검사
    if (!formData.title) {
      titleRef.current.focus();
      alert("제목을 입력하세요!");
      return;
    }
    if (!formData.artist) {
      alert("가수를 입력하세요!");
      return;
    }

    // 저장
    onSave(formData);
    onClose(); // 모달 닫기
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "음악 수정" : "음악 추가"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>제목</label>
              <input
                type="text"
                className="form-control"
                value={formData.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                ref={titleRef}
              />
            </div>
            <div className="mb-3">
              <label>가수</label>
              <input
                type="text"
                className="form-control"
                value={formData.artist || ""}
                onChange={(e) => handleChange("artist", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>연도</label>
              <input
                type="number"
                className="form-control"
                value={formData.year || ""}
                onChange={(e) => handleChange("year", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>장르</label>
              <input
                type="text"
                className="form-control"
                value={formData.genre || ""}
                onChange={(e) => handleChange("genre", e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              닫기
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
