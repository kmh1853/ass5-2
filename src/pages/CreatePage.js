import React, { useState, useRef } from "react";

const CreatePage = ({ onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    genre: "",
  });

  const titleRef = useRef();
  const artistRef = useRef();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // 유효성 검사
    if (!formData.title) {
      titleRef.current.focus();
      alert("제목은 필수입니다.");
      return;
    }
    if (!formData.artist) {
      artistRef.current.focus();
      alert("가수는 필수입니다.");
      return;
    }

    try {
      // API 호출
      const response = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("음악 정보가 성공적으로 추가되었습니다.");
        setFormData({ title: "", artist: "", year: "", genre: "" });
      } else {
        console.error("Failed to create music.");
      }
    } catch (error) {
      console.error("Error creating music:", error);
    }
  };

  return (
    <div className="container">
      <h1>음악 추가</h1>
      <div className="mb-3">
        <label>제목</label>
        <input
          type="text"
          className="form-control"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          ref={titleRef}
        />
      </div>
      <div className="mb-3">
        <label>가수</label>
        <input
          type="text"
          className="form-control"
          value={formData.artist}
          onChange={(e) => handleChange("artist", e.target.value)}
          ref={artistRef}
        />
      </div>
      <div className="mb-3">
        <label>연도</label>
        <input
          type="number"
          className="form-control"
          value={formData.year}
          onChange={(e) => handleChange("year", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>장르</label>
        <input
          type="text"
          className="form-control"
          value={formData.genre}
          onChange={(e) => handleChange("genre", e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        저장
      </button>
    </div>
  );
};

export default CreatePage;
