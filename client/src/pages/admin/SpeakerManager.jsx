import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminForm from "./AdminForm";

export default function SpeakerManager() {
  const [speakers, setSpeakers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/speakers");
      setSpeakers(response.data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this speaker?")) {
      try {
        await axios.delete(`http://localhost:8000/api/speakers/${id}`);
        fetchSpeakers();
      } catch (error) {
        console.error("Error deleting speaker:", error);
      }
    }
  };

  const handleEdit = (speaker) => {
    setCurrentSpeaker(speaker);
    setIsEditing(true);
  };

  return (
    <div className="manager-container">
      <h2>Speaker Management</h2>
      {isEditing ? (
        <AdminForm
          speaker={currentSpeaker}
          onSubmitSuccess={() => {
            setIsEditing(false);
            fetchSpeakers();
          }}
        />
      ) : (
        <>
          <AdminForm onSubmitSuccess={fetchSpeakers} />
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lecture Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {speakers.map((speaker) => (
                <tr key={speaker._id}>
                  <td>{speaker.name}</td>
                  <td>{speaker.lecture_title}</td>
                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(speaker)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(speaker._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
