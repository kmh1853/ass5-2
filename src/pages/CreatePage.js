import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [formData, setFormData] = useState({ title: "", artist: "", year: "", genre: "" });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await fetch("http://localhost:3001/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: Date.now().toString() }),
      });
      navigate("/list");
    } catch (error) {
      console.error("Error adding music:", error);
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
        />
      </div>
      <div className="mb-3">
        <label>가수</label>
        <input
          type="text"
          className="form-control"
          value={formData.artist}
          onChange={(e) => handleChange("artist", e.target.value)}
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
