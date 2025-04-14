import React from "react";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer style={{
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "10px",
      backgroundColor: "#222",
      color: "#fff",
      fontSize: "18px"
    }}>
      <div style={{ 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "space-between", 
  width: "100%", 
  padding: "10px"
}}>
  <div>
    <img 
      src={Logo} 
      alt="Logo" 
      style={{ 
        width: "50px", 
        height: "auto", 
        marginRight: "10px" }} 
    />
  </div>

  <div>
    <span>N O M A D</span>
  </div>

  <div style={{ 
    fontSize: "9px", 
    fontWeight: "bold",
    marginTop: "30px"}}>
    <span>© 2024</span>
  </div>
</div>


    </footer>
  );
}

export default Footer;
