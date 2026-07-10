import React, { useState } from "react";
import axios from "axios";

export default function AdminForm({ speaker, onSubmitSuccess }) {
  const [speakerName, setSpeakerName] = useState(speaker?.name || "");
  const [speakerDesc, setSpeakerDesc] = useState(speaker?.description || "");
  const [lecTitle, setLecTitle] = useState(speaker?.lecture_title || "");
  const [speakerPhoto, setSpeakerPhoto] = useState(null);
  const [ytLink, setYtLink] = useState(speaker?.yt_link || "");
  const [type, setType] = useState(speaker?.type || "upcoming");
  const [priorityNumber, setPriorityNumber] = useState(speaker?.priority_number || 0);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", speakerName);
      formData.append("lecture_title", lecTitle);
      formData.append("description", speakerDesc);
      formData.append("yt_link", ytLink);
      formData.append("type", type);
      formData.append("priority_number", parseInt(priorityNumber));

      if (speakerPhoto) {
        formData.append("image", speakerPhoto);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (speaker) {
        await axios.put(`http://localhost:8000/api/speakers/${speaker._id}`, formData, config);
        alert(`${speakerName} updated successfully`);
      } else {
        await axios.post("http://localhost:8000/api/speakers", formData, config);
        alert(`${speakerName} added to speaker database`);
      }
      
      setSpeakerName("");
      setSpeakerDesc("");
      setLecTitle("");
      setSpeakerPhoto(null);
      setYtLink("");
      setType("upcoming");
      setPriorityNumber(0);
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (e) {
      alert("Error in saving speaker");
      console.log("Consoling error", e);
    }
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="speakername" className="form-label">
            Speaker Name
          </label>
          <input
            type="text"
            className="form-control"
            value={speakerName}
            id="speakername"
            onChange={(e) => {
              setSpeakerName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lecturetitle" className="form-label">
            Lecture Title
          </label>
          <input
            type="text"
            className="form-control"
            value={lecTitle}
            id="lecturetitle"
            onChange={(e) => {
              setLecTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="aboutspeaker" className="form-label">
            About Speaker
          </label>
          <textarea
            type="text"
            className="form-control"
            id="aboutspeaker"
            value={speakerDesc}
            rows="5"
            cols="50"
            onChange={(e) => {
              setSpeakerDesc(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="speakerpic" className="form-label">
            Speaker Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="speakerpic"
            onChange={(e) => {
              setSpeakerPhoto(e.target.files[0]);
            }}
          />
          {speaker?.image && (
            <div className="mt-2">
              <small>Current image is saved. Upload a new one to replace it.</small>
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="ytlink" className="form-label">
            YouTube Link
          </label>
          <input
            type="text"
            value={ytLink}
            className="form-control"
            id="ytlink"
            onChange={(e) => {
              setYtLink(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Speaker Type
          </label>
          <select
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="upcoming">Upcoming Speaker</option>
            <option value="past">Past Speaker</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="prioritynumber" className="form-label">
            Priority Number (for sorting past speakers)
          </label>
          <input
            type="number"
            value={priorityNumber}
            className="form-control"
            id="prioritynumber"
            onChange={(e) => setPriorityNumber(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
}
