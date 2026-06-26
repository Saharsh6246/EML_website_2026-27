import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

  // Fetch all images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/gallery");
      setImages(response.data);
    } catch (error) {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid image file");
      event.target.value = null;
    }
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);

    try {
      setUploadLoading(true);
      await axios.post("http://localhost:8000/api/gallery", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success("Image uploaded successfully");
      setSelectedFile(null);
      setTitle("");
      fetchImages();
      
      // Reset file input
      const fileInput = document.getElementById('imageInput');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle image deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/gallery/${id}`);
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="manager-container">
      <h2>Gallery Management</h2>

      {/* Upload Form */}
      <div className="form-container">
        <h3>Upload New Image</h3>
        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Image Title (Optional)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageInput">Select Image</label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={uploadLoading || !selectedFile}
          >
            {uploadLoading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="loading">Loading images...</div>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image._id} className="gallery-item-admin">
              <img 
                src={image.imageUrl} 
                alt={image.title || 'Gallery image'} 
              />
              <div className="gallery-item-overlay">
                <p className="gallery-item-title">{image.title || 'Untitled'}</p>
                <button 
                  onClick={() => handleDelete(image._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}