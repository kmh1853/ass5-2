import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import myData from "../my_data.json";

const CreatePage = () => {
  const [formData, setFormData] = useState({ title: "", artist: "", year: "", genre: "" });
  const navigate = useNavigate();

  const titleRef = useRef();
  const artistRef = useRef();
  const yearRef = useRef();
  const genreRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.title) {
      alert("Title 을 입력하세요!");
      titleRef.current.focus();
      return;
    }
    if (!formData.artist) {
      alert("Artist 을 입력하세요!");
      artistRef.current.focus();
      return;
    }
    if (!formData.year) {
      alert("Year 을 입력하세요!");
      yearRef.current.focus();
      return;
    }
    if (!formData.genre) {
      alert("Genre 를 입력하세요!");
      genreRef.current.focus();
      return;
    }

    const newMusic = { id: Date.now().toString(), ...formData };
    myData.music.push(newMusic);
    alert("Music added successfully!");
    navigate("/list");
  };

  return (
    <div className="container mt-4">
      <h1>Create New Music</h1>
      <form>
        <input
          ref={titleRef}
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Title"
        />
        <input
          ref={artistRef}
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Artist"
        />
        <input
          ref={yearRef}
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Year"
        />
        <input
          ref={genreRef}
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Genre"
        />
        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
          추가
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
