import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  const [updateCount, setUpdateCount] = useState(0); // 수정 횟수

  useEffect(() => {
    fetch(`http://localhost:3001/music/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching music:", error));
  }, [id]);

  const handleChange = async (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setUpdateCount((prev) => prev + 1);

    try {
      await fetch(`http://localhost:3001/music/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Error updating music:", error);
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>음악 수정</h1>
      <p>수정 횟수: {updateCount}</p>
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
    </div>
  );
};

export default UpdatePage;
