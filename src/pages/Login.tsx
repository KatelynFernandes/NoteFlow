"use client"; // Required for Next.js client components

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "../styles/Login.css"; 

const Login: React.FC = () => {
  const router = useRouter(); // Initialize router

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <label>Email</label>
        <input type="text" className="login-input" placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" className="login-input" placeholder="Enter your password" />

        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="login-text">
        Don't have an account?  
        <a href="#" onClick={() => router.push("/Signup")} className="login-link"> Sign Up</a>
      </p>
    </div>
  );
};

export default Login;

