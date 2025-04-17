import React, { useRef, useState, useEffect } from "react";
import Pozadina from "../assets/pozadina.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const continents = ["All", "Europe", "Asia", "Africa", "North America", "South America", "Oceania"];

const LandingPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const url = selectedContinent === "All" 
          ? 'http://localhost:5000/api/v1/destinations?featured=true'
          : `http://localhost:5000/api/v1/destinations?featured=true&continent=${selectedContinent}`;
        
        const response = await axios.get(url);
        
        if (response.data?.status === "success") {
          setDestinations(response.data.data.destinations);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [selectedContinent]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <p>Loading destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        flexDirection: "column",
        width: "100%"
      }}>
        <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif",
      width: "100%"}}>

      <div style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${Pozadina})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}></div>

        <h1 style={{ 
          fontSize: "4rem", 
          fontWeight: "bold", 
          zIndex: 1
        }}>
          N O M A D
        </h1>
        <p style={{ 
          fontSize: "1.5rem", 
          zIndex: 1,
          marginTop: -30
        }}>
          Travel with us
        </p>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "center",
        gap: "20px", 
        padding: "20px", 
        backgroundColor: "#f8f8f8", 
        borderBottom: "2px solid #ddd"
      }}>
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => setSelectedContinent(continent)}
            style={{
              padding: "10px 15px",
              border: "none",
              backgroundColor: selectedContinent === continent ? "#007bff" : "white",
              color: selectedContinent === continent ? "white" : "black",
              cursor: "pointer",
              fontWeight: "bold",
              borderRadius: "5px",
              minWidth: "120px"
            }}
          >
            {continent}
          </button>
        ))}
      </div>
  
      <div style={{
        position: "relative",
        padding: "20px",
        backgroundColor: "#fff",
        width: "96.43vw"
      }}>
        <button 
          onClick={scrollLeft}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            zIndex: 10
          }}
        >
          ◀
        </button>

        <div ref={scrollRef} style={{
          display: "flex",
          overflowX: "hidden",
          gap: "15px",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth"
        }}>
          {destinations.length === 0 ? (
            <div style={{ 
              width: "100%", 
              textAlign: "center",
              padding: "40px"
            }}>
              <p style={{ 
                fontSize: "1.2rem", 
                color: "#666",
                marginBottom: "20px"
              }}>
                No destinations found for {selectedContinent}
              </p>
              <button 
                onClick={() => setSelectedContinent("All")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Show All Destinations
              </button>
            </div>
          ) : (
            destinations.map((destination) => (
              <div 
                key={destination.id} 
                style={{
                  flex: "0 0 auto",
                  width: "300px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s",
                  ":hover": {
                    transform: "translateY(-5px)"
                  }
                }}
                onClick={() => navigate(`/details/${destination.id}`)}
              >
                <div style={{ 
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}>
                  <img 
                    src={destination.primary_image || "https://via.placeholder.com/300x200?text=No+Image"} 
                    alt={destination.name}
                    style={{ 
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>
                <h3 style={{ 
                  margin: "0 0 5px 0",
                  fontSize: "1.2rem",
                  fontWeight: "bold"
                }}>
                  {destination.name}
                </h3>
                <p style={{ 
                  color: "#666",
                  margin: "0 0 10px 0",
                  fontSize: "0.9rem"
                }}>
                  {destination.city}, {destination.country}
                </p>
                <div style={{ 
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto"
                }}>
                  <span style={{ 
                    fontWeight: "bold",
                    fontSize: "1.1rem"
                  }}>
                    {destination.price} KM
                  </span>
                  <button 
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={scrollRight}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            zIndex: 10
          }}
        >
          ▶
        </button>
      </div>

      
      <div style={{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#f8f8f8"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Contact Us</h2>
        <div style={{ 
          maxWidth: "600px", 
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          <input
            type="email"
            placeholder="Your email..."
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem"
            }}
          />
          <textarea
            placeholder="Your message..."
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              height: "120px",
              resize: "vertical"
            }}
          />
          <button
            style={{
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;