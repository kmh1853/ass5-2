import React, { useState } from "react";

const ModalComponent = ({ show, onClose, onSave, data, isEdit }) => {
  const [formData, setFormData] = useState(data || { title: "", artist: "", year: "", genre: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({ title: "", artist: "", year: "", genre: "" }); 
    onClose();
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit Music" : "Add Music"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artist" className="form-label">Artist</label>
                <input
                  type="text"
                  className="form-control"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
