import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TeamManager() {
  const [teammates, setTeammates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    year: new Date().getFullYear(),
    photo: "",
    vertical: "",
  });
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeammates();
  }, []);

  const fetchTeammates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/team/${new Date().getFullYear()}`
      );
      setTeammates(response.data);
    } catch (error) {
      setMessage("Error fetching team members");
      console.error("Error fetching team:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/team", formData);
      setMessage("Team member added successfully!");
      fetchTeammates();
      resetForm();
    } catch (error) {
      setMessage("Error adding team member");
      console.error("Error saving teammate:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      year: new Date().getFullYear(),
      photo: "",
      vertical: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/team/${editingId}`, formData);
      setMessage("Team member updated successfully!");
      setEditingId(null);
      fetchTeammates();
      resetForm();
    } catch (error) {
      setMessage("Error updating team member");
      console.error("Error updating teammate:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`http://localhost:8000/api/team/${id}`);
        setMessage("Team member deleted successfully!");
        fetchTeammates();
      } catch (error) {
        setMessage("Error deleting team member");
        console.error("Error deleting teammate:", error);
      }
    }
  };
  const startEditing = (teammate) => {
    setEditingId(teammate._id);
    setFormData({
      name: teammate.name,
      position: teammate.position,
      year: teammate.year,
      photo: teammate.photo,
      vertical: teammate.vertical || "",
    });
  };

  return (
    <div className="manager-container">
      <h2>Team Management</h2>

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <div className="form-container">
        <h3>{editingId ? "Edit Team Member" : "Add Team Member"}</h3>
        <form onSubmit={editingId ? handleUpdate : handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Photo URL</label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Vertical (Optional)</label>
            <input
              type="text"
              name="vertical"
              value={formData.vertical}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            {editingId ? "Update Team Member" : "Add Team Member"}
          </button>
          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                resetForm();
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Position</th>
            <th>Year</th>
            <th>Vertical</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teammates.map((teammate) => (
            <tr key={teammate._id}>
              <td>
                <img
                  src={teammate.photo}
                  alt={teammate.name}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{teammate.name}</td>
              <td>{teammate.position}</td>
              <td>{teammate.year}</td>
              <td>{teammate.vertical || "-"}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => startEditing(teammate)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(teammate._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
