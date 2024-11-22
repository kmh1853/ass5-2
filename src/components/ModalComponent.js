import React, { useState, useEffect } from "react";

const ModalComponent = ({ show, onClose, onSave, data, isEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    genre: "",
  });

  // 데이터를 수정하거나 추가할 때 초기값 설정
  useEffect(() => {
    if (data) {
      setFormData(data); // 수정 시 기존 데이터 로드
    } else {
      setFormData({ title: "", artist: "", year: "", genre: "" }); // 추가 시 초기화
    }
  }, [data]);

  // 입력 필드 변경 처리
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    // 필수 항목 검사
    if (!formData.title || !formData.artist) {
      alert("제목과 가수는 필수 항목입니다.");
      return;
    }
    onSave(formData); // 부모 컴포넌트로 데이터 전달
    onClose(); // 모달 닫기
  };

  // 모달이 보이지 않을 때 아무것도 렌더링하지 않음
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "음악 수정" : "음악 추가"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* 제목 */}
            <div className="mb-3">
              <label>제목</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            {/* 가수 */}
            <div className="mb-3">
              <label>가수</label>
              <input
                type="text"
                className="form-control"
                value={formData.artist}
                onChange={(e) => handleChange("artist", e.target.value)}
              />
            </div>

            {/* 연도 */}
            <div className="mb-3">
              <label>연도</label>
              <input
                type="number"
                className="form-control"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
              />
            </div>

            {/* 장르 */}
            <div className="mb-3">
              <label>장르</label>
              <input
                type="text"
                className="form-control"
                value={formData.genre}
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
