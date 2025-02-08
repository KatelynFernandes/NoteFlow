"use client"; // Required for Next.js client components

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const router = useRouter(); // Initialize router

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form">
        <label>Username</label>
        <input type="text" className="signup-input" placeholder="Enter your username" />

        <label>Password</label>
        <input type="password" className="signup-input" placeholder="Enter your password" />

        <label>Confirm Password</label>
        <input type="password" className="signup-input" placeholder="Confirm your password" />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="signup-text">
        Already have an account?  
        <a href="#" onClick={() => router.push("/pages/Login")} className="signup-link">Back to Login</a>
      </p>
    </div>
  );
};

export default Signup;


