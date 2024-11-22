import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const [music, setMusic] = useState(null);

  useEffect(() => {
    // API 호출로 데이터 로드
    fetch(`/api/music/${id}`)
      .then((response) => response.json())
      .then((data) => setMusic(data))
      .catch((error) => console.error("Error fetching music:", error));
  }, [id]);

  if (!music) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>음악 상세 정보</h1>
      <p><strong>제목:</strong> {music.title}</p>
      <p><strong>가수:</strong> {music.artist}</p>
      <p><strong>연도:</strong> {music.year}</p>
      <p><strong>장르:</strong> {music.genre}</p>
    </div>
  );
};

export default DetailPage;
