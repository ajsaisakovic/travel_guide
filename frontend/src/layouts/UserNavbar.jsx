import React from "react";
import Logo from "../assets/logo.png";

const UserNavbar = () => {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#f8f9fa",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
    }}>
      
      <img 
        src={Logo} 
        alt="Logo" 
        style={{ width: "60px", height: "auto" }} 
      />

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Home</a>
        <a href="/destinations" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Destinations</a>
        <a href="/blog" style={{ textDecoration: "none", color: "#333", fontWeight: "Bold"}}>Blog</a>
        <a href="/reviews" style={{ textDecoration: "none", color: "#333", fontWeight: "Bold"}}>Reviews</a>
        <a href="/faq" style={{ textDecoration: "none", color: "#333", fontWeight: "Bold"}}>FAQ</a>
        
        <a href="/register" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Register</a>
        <a href="/login" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Login</a>
      </div>
      
    </nav>
  );
}

export default UserNavbar;
