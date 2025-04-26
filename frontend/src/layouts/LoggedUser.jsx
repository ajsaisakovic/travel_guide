import React from "react";
import Logo from "../assets/logo.png";

const LoggedUser = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav style={{
      display: "flex",
      maxWidth: "100%",
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
        <a href="/blog" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Blog</a>
        <a href="/reviews" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Reviews</a>
        <a href="/faq" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>FAQ</a>
        <a href="/profile" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Profile page</a>
        <button 
          onClick={handleLogout} 
          style={{ textDecoration: "none", marginLeft: "-19px", marginTop:"-10px", color: "#333", fontWeight: "bold", background: "transparent", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default LoggedUser;
