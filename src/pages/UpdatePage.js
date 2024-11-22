import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // 기존 데이터 가져오기
    fetch(`/api/music/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching music data:", error));
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/music/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("음악 정보가 성공적으로 수정되었습니다.");
        navigate("/list");
      } else {
        console.error("Failed to update music.");
      }
    } catch (error) {
      console.error("Error updating music:", error);
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>음악 수정</h1>
      <div className="mb-3">
        <label>제목</label>
        <input
          type="text"
          className="form-control"
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
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
      <button className="btn btn-primary" onClick={handleSave}>
        저장
      </button>
    </div>
  );
};

export default UpdatePage;
