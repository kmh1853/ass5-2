import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myData from "../my_data.json";

const UpdatePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: "", artist: "", year: "", genre: "" });
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    const musicToUpdate = myData.music.find((item) => item.id === id);
    if (musicToUpdate) {
      setFormData(musicToUpdate);
    }
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setEditCount((prevCount) => prevCount + 1);

    const index = myData.music.findIndex((item) => item.id === id);
    if (index !== -1) {
      myData.music[index] = updatedData;
    }

    try {
      console.log(`Simulated PUT request: Updating ${name} to ${value}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Update Music</h1>
      <form>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Title"
        />
        <input
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Artist"
        />
        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Year"
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Genre"
        />
        <p>총 수정 횟수: {editCount}</p>
      </form>
    </div>
  );
};

export default UpdatePage;
