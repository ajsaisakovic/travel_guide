import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserNavbar from "./layouts/UserNavbar"; 
import LoggedUser from "./layouts/LoggedUser"; 
import Footer from "./layouts/Footer";
import Home from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Destinations from "./pages/Destinations";
import FAQ from "./pages/faq";
import DestinationDetails from "./pages/DestinationDetails";

const App = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <Router>
      {user ? <LoggedUser /> : <UserNavbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="destinations" element={<Destinations/>} />
        <Route path="/details/:id" element={<DestinationDetails/>} />
      </Routes>

      <Footer/>
      
    </Router>
  );
};

export default App;
