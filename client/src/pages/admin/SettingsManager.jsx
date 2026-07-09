import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SettingsManager() {
  const [brochureLink, setBrochureLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/settings");
      if (response.data) {
        setBrochureLink(response.data.brochure_link || "");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:8000/api/settings", {
        brochure_link: brochureLink,
      });
      alert("Settings updated successfully!");
    } catch (error) {
      alert("Failed to update settings");
      console.error("Error updating settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-container">
      <h2>Site Settings</h2>

      <div className="form-container">
        <h3>Update Brochure Link</h3>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="brochureLink">Brochure URL</label>
            <input
              type="url"
              id="brochureLink"
              value={brochureLink}
              onChange={(e) => setBrochureLink(e.target.value)}
              placeholder="https://example.com/brochure.pdf"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
