"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomePage from "../pages/Homepage";

const Page: React.FC = () => {
  return (
    <Router>
      <Routes> {/* Routes wrapper is required */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default Page;
