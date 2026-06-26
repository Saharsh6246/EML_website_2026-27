import React, { useState, useEffect } from "react";
import "./gallery.css";
import Masonry from "react-responsive-masonry";
import axios from "axios";
import { toast } from "react-toastify";
//import LoadingSpinner from "../../components/LoadingSpinner"; // Assuming you have this component
import BounceLoader from "react-spinners/BounceLoader";
export default function ReactGallery() {
  const [data, setData] = useState({ img: "", i: 0 });
  const [colCount, setColCount] = useState(3);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/gallery`);
      setImages(response.data);
    } catch (error) {
      toast.error("Failed to load gallery images");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Column count handler
  const changeCol = () => {
    const width = window.innerWidth;
    if (width > 1200) setColCount(4);
    else if (width > 992) setColCount(3);
    else if (width >= 768) setColCount(2);
    else setColCount(1);
  };

  useEffect(() => {
    window.addEventListener('resize', changeCol);
    window.addEventListener('load', changeCol);
    changeCol(); // Initial call

    return () => {
      window.removeEventListener('resize', changeCol);
      window.removeEventListener('load', changeCol);
    };
  }, []);

  // Image viewer handlers
  const viewImage = (img, i) => {
    setData({ img, i });
  };

  const imgAction = (action) => {
    let i = data.i;
    if (action === 'next-img' && i < images.length - 1) {
      setData({ img: images[i + 1].imageUrl, i: i + 1 });
    }
    if (action === 'prev-img' && i > 0) {
      setData({ img: images[i - 1].imageUrl, i: i - 1 });
    }
    if (!action) {
      setData({ img: '', i: 0 });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!data.img) return; // Only handle keys when viewer is open
      
      switch(e.key) {
        case 'ArrowRight':
          imgAction('next-img');
          break;
        case 'ArrowLeft':
          imgAction('prev-img');
          break;
        case 'Escape':
          imgAction();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data]);

  return (
    <div className="gallery-wrapper">
      {loading ? (
       <BounceLoader />
      ) : (
        <>
          {data.img && (
            <div className="gallery-full-img">
              <div className="viewer-overlay" onClick={() => imgAction()}></div>
              <div className="viewer-content">
                <button onClick={() => imgAction()} className="cross-btn btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>

                <img 
                  src={data.img} 
                  className="viewed-image" 
                  alt={`Gallery item ${data.i + 1}`}
                />

                <div className="gallery-btns">
                  <button 
                    className="nav-btn prev-btn" 
                    onClick={() => imgAction('prev-img')}
                    disabled={data.i === 0}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button 
                    className="nav-btn next-btn" 
                    onClick={() => imgAction('next-img')}
                    disabled={data.i === images.length - 1}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          <Masonry 
            columnsCount={colCount} 
            gutter="12px" 
            className="container gallery-container"
          >
            {images.map((image, i) => (
              <div 
                key={image._id} 
                className="gallery-item"
                data-aos="fade-up" 
                data-aos-offset="100" 
                data-aos-duration="350"
              >
                <img
                  src={image.imageUrl}
                  alt={image.title || `Gallery item ${i + 1}`}
                  onClick={() => viewImage(image.imageUrl, i)}
                />
              </div>
            ))}
          </Masonry>
        </>
      )}
    </div>
  );
}