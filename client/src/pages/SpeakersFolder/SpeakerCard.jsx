import React, { useState } from "react";
import stock_photo_1 from "../../Images/stockPhotos/img1.png";
import stock_photo_2 from "../../Images/stockPhotos/img3.png";
import stock_photo_3 from "../../Images/stockPhotos/img2.png";

export default function SpeakerCard(props) {
  const [showVideo, setShowVideo] = useState(false);
  const { name, lecture_title, description, image, yt_link } = props.data;

  const getRandomStockPhoto = () => {
    const stockPhotos = [stock_photo_1, stock_photo_2, stock_photo_3];
    const randomIndex = Math.floor(Math.random() * stockPhotos.length);
    return stockPhotos[randomIndex];
  };

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(yt_link);
  const displayImage = image || getRandomStockPhoto();

  return (
    <div className="col-lg-6 order-md-1">
      <div className="speaker-card">
        <div className="card-content">
          <div className="speaker-image">
            {showVideo && videoId ? (
              <div className="video-container-in-image">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={lecture_title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img 
                src={displayImage} 
                alt={name || "Speaker"} 
                onError={(e) => {
                  e.target.src = getRandomStockPhoto();
                  e.target.onerror = null;
                }}
              />
            )}
          </div>
          <div className="speaker-info">
            <h2>{name}</h2>
            <h4>{lecture_title}</h4>
            <p>{description}</p>

            {yt_link && (
              <button
                className="watch-btn"
                onClick={() => setShowVideo(!showVideo)}
              >
                <i className="fa-brands fa-youtube"></i>
                {showVideo ? " Show Photo" : " Watch Video"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}