import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const [music, setMusic] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/music")
      .then((response) => response.json())
      .then((data) => setMusic(data))
      .catch((error) => console.error("Error fetching music:", error));
  }, []);

  return (
    <div className="container">
      <h1>음악 목록</h1>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/create")}>
        음악 추가
      </button>
      <div className="row">
        {music.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>
                  <strong>가수:</strong> {item.artist} <br />
                  <strong>연도:</strong> {item.year} <br />
                  <strong>장르:</strong> {item.genre}
                </p>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/update/${item.id}`)}
                >
                  수정
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
