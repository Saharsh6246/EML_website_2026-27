import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmailManager() {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/admin-emails');
      setEmails(response.data.emails);
    } catch (error) {
      setError('Failed to fetch admin emails');
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/admin-emails', { email: newEmail });
      setSuccess('Email added successfully');
      setNewEmail('');
      fetchEmails();
    } catch (error) {
      setError('Failed to add email');
    }
  };

  const handleRemoveEmail = async (email) => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/admin-emails/${email}`);
      setSuccess('Email removed successfully');
      fetchEmails();
    } catch (error) {
      setError('Failed to remove email');
    }
  };

  return (
    <div className="email-manager">
      <h2>Manage Admin Emails</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleAddEmail} className="add-email-form">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new admin email"
          required
        />
        <button type="submit">Add Admin Email</button>
      </form>

      <div className="email-list">
        <h3>Current Admin Emails:</h3>
        {emails.map((email) => (
          <div key={email} className="email-item">
            <span>{email}</span>
            <button onClick={() => handleRemoveEmail(email)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
} 