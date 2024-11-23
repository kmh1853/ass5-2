import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import myData from "../my_data.json"; 

const DetailPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [music, setMusic] = useState(null);

  useEffect(() => {
    const musicDetail = myData.music.find((item) => item.id === id);
    setMusic(musicDetail);
  }, [id]);

  if (!music) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Music Details</h1>
      <p><strong>Title:</strong> {music.title}</p>
      <p><strong>Artist:</strong> {music.artist}</p>
      <p><strong>Year:</strong> {music.year}</p>
      <p><strong>Genre:</strong> {music.genre}</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/list")}>
        List로 이동
      </button>
    </div>
  );
};

export default DetailPage;
