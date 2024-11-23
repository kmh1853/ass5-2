import React, { useState } from "react";
import { Link } from "react-router-dom";
import myData from "../my_data.json";

const ShowList = () => {
  const [music, setMusic] = useState(myData.music);

  const handleDelete = (id) => {
    setMusic(music.filter((item) => item.id !== id));
    alert(`Music with ID ${id} has been deleted!`);
  };

  return (
    <div className="container mt-4">
      <h1>Music List</h1>
      <Link to="/create" className="btn btn-primary mb-3">
        음악 추가
      </Link>
      <div className="row">
        {music.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>
                  <strong>Artist:</strong> {item.artist} <br />
                  <strong>Year:</strong> {item.year} <br />
                  <strong>Genre:</strong> {item.genre}
                </p>
                <Link
                  to={`/detail/${item.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Details
                </Link>
                <Link
                  to={`/update/${item.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
