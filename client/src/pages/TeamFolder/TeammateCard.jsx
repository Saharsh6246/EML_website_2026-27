import React, { useState } from "react";
import "./team.css";

export default function TeammateCard({ data }) {
  const [imageError, setImageError] = useState(false);
  const { name, position, photo, vertical } = data;

  let cardClass = "teammate-card";
  if (position === "Faculty Advisor") {
    cardClass += " full-width";
  } else if (position === "Student Head") {
    cardClass += " half-width";
  } else {
    cardClass += " third-width";
  }

  return (
    <div className={cardClass}>
      <div className="card">
        <div className="image-container">
          <img
            src={photo}
            alt={name}
            onError={(e) => {
              console.error("Image failed to load:", photo);
              setImageError(true);
            }}
            loading="lazy"
            crossOrigin="anonymous"
          />
          {imageError && (
            <div className="image-error">Image not available</div>
          )}
          {vertical && (
            <div className="vertical-overlay">
              <h1>{vertical}</h1>
            </div>
          )}
        </div>
        <div className="text">
          <h3>{name}</h3>
          <h4>{position}</h4>
        </div>
      </div>
    </div>
  );
}
