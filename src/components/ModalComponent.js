import React, { useState } from "react";

const ModalComponent = ({ show, onClose, onSave, data, isEdit }) => {
  const [formData, setFormData] = useState(data || { title: "", artist: "", year: "", genre: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    show && (
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEdit ? "Edit Music" : "Add Music"}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="form-control mb-2"
              />
              <input
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                placeholder="Artist"
                className="form-control mb-2"
              />
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                className="form-control mb-2"
              />
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre"
                className="form-control mb-2"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                {isEdit ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalComponent;
