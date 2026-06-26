import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AdminForm from "./AdminForm";
import "./admin.css";
import SpeakerManager from "./SpeakerManager";
import TeamManager from "./TeamManager";
import GalleryManager from "./GalleryManager";
import EmailManager from "./EmailManager";

export default function AdminMain() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("speakers");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      try {
        const decoded = jwtDecode(adminToken);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminToken");
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
      }
    }
  }, []);

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/google-login",
        {
          email: decoded.email,
          name: decoded.name,
          googleId: decoded.sub,
        }
      );

      if (response.data.admin) {
        setIsAuthenticated(true);
        localStorage.setItem("adminToken", credentialResponse.credential);
      }
    } catch (error) {
      setError(
        "Authentication failed. Only authorized administrators can login."
      );
    }
  };

  const handleError = () => {
    setError("Login Failed");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "speakers":
        return <SpeakerManager />;
      case "team":
        return <TeamManager />;
      case "gallery":
        return <GalleryManager />;
      case "emails":
        return <EmailManager />;
      default:
        return <SpeakerManager />;
    }
  };

  return (
    <div id="admin">
      <div className="admin-wrapper">
        {!isAuthenticated ? (
          <div className="login-container">
            <h2>Admin Login</h2>
            {error && <div className="error-message">{error}</div>}
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>
        ) : (
          <>
            <div className="admin-sidebar">
              <h2>Admin Panel</h2>
              <nav>
                <button
                  className={`nav-btn ${
                    activeTab === "speakers" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("speakers")}
                >
                  Speakers
                </button>
                <button
                  className={`nav-btn ${activeTab === "team" ? "active" : ""}`}
                  onClick={() => setActiveTab("team")}
                >
                  Team
                </button>
                <button
                  className={`nav-btn ${activeTab === "gallery" ? "active" : ""}`}
                  onClick={() => setActiveTab("gallery")}
                >
                  Gallery
                </button>
                <button
                  className={`nav-btn ${activeTab === "emails" ? "active" : ""}`}
                  onClick={() => setActiveTab("emails")}
                >
                  Manage Admins
                </button>
                <button
                  className="nav-btn logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </nav>
            </div>
            <div className="admin-content">{renderContent()}</div>
          </>
        )}
      </div>
    </div>
  );
}
