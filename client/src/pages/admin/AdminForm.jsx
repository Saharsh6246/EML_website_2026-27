import React, { useState } from "react";
import axios from "axios";

export default function AdminForm() {
  const [speakerName, setSpeakerName] = useState("");
  const [speakerDesc, setSpeakerDesc] = useState("");
  const [lecTitle, setLecTitle] = useState("");
  const [speakerPhoto, setSpeakerPhoto] = useState("");
  const [ytLink, setYtLink] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/speakers", {
        name: speakerName,
        lecture_title: lecTitle,
        description: speakerDesc,
        image: speakerPhoto,
        yt_link: ytLink,
      });
      alert(`${speakerName} added to speaker database`);
      setSpeakerName("");
      setSpeakerDesc("");
      setLecTitle("");
      setSpeakerPhoto("");
      setYtLink("");
    } catch (e) {
      // console.log(speakerName, speakerDesc, lecTitle,speakerPhoto, ytLink);
      alert("Error in adding speaker");
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
            Speaker Photo Link
          </label>
          <input
            type="text"
            value={speakerPhoto}
            className="form-control"
            id="speakerpic"
            onChange={(e) => {
              setSpeakerPhoto(e.target.value);
            }}
          />
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

        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
}
