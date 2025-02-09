"use client"; // Required for Next.js client components

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    // API call for updating password can be added here
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Update Profile</h2>
      <form className="profile-form" onSubmit={handleUpdatePassword}>
        <label>Username</label>
        <input
          type="text"
          className="profile-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <label>Current Password</label>
        <input
          type="password"
          className="profile-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          required
        />

        <label>New Password</label>
        <input
          type="password"
          className="profile-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          className="profile-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />

        <button type="submit" className="profile-button">Update Password</button>
      </form>
      <p className="profile-text">
        <a href="#" onClick={() => router.push("/")} className="profile-link">Back to Homepage</a>
      </p>
    </div>
  );
};

export default ProfilePage;

