import React, { useRef, useState } from "react";
import Pozadina from "../assets/pozadina.png";
import { useNavigate } from "react-router-dom";

const testDestinations = [
  {
    id: 1,
    city: "Pariz",
    country: "Francuska",
    continent: "Europe",
    price: "250 KM",
    image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    city: "London",
    country: "Velika Britanija",
    continent: "Europe",
    price: "300 KM",
    image: "https://example.com/london.jpg",
  },
  {
    id: 3,
    city: "Pariz",
    country: "Francuska",
    continent: "Europe",
    price: "250 KM",
    image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    city: "London",
    country: "Velika Britanija",
    continent: "Europe",
    price: "300 KM",
    image: "https://example.com/london.jpg",
  },
  {
    id: 5,
    city: "New York",
    country: "SAD",
    continent: "North America",
    price: "500 KM",
    image: "https://example.com/newyork.jpg",
  },
  {
    id: 6,
    city: "Tokyo",
    country: "Japan",
    continent: "Asia",
    price: "450 KM",
    image: "https://example.com/tokyo.jpg",
  },

];

const continents = ["All", "Africa", "Asia", "Europe", "North America", "Oceania", "South America"];

const LandingPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [selectedContinent, setSelectedContinent] = useState("All");

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  const filteredDestinations = selectedContinent === "All" ? testDestinations : testDestinations.filter((destination) => destination.continent === selectedContinent);

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

        <h1 style={{ fontSize: "4rem", fontWeight: "bold", zIndex: 1 }}>N O M A D</h1>
        <p style={{ fontSize: "1.5rem", zIndex: 1 }}>Travel with us</p>
      </div>

    
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px", backgroundColor: "#f8f8f8", borderBottom: "2px solid #ddd" }}>
        {continents.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedContinent(tab)}
            style={{
              padding: "10px 15px", border: "none",
              backgroundColor: selectedContinent === tab ? "#007bff" : "white",
              color: selectedContinent === tab ? "white" : "black",
              cursor: "pointer", fontWeight: "bold",
              borderRadius: "5px"
            }}
          >
            {tab}
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
            borderRadius: "5px"
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
          {filteredDestinations.length === 0 ? (
            <p style={{
              textAlign: "center",
              width: "100%",
              fontSize: "1.5rem",
              color: "#666"
            }}>
              No destinations available for the selected continent. Explore other regions!
            </p>
          ) : (
            filteredDestinations.map((destination) => (
              <div key={destination.id} style={{
                minWidth: "250px",
                padding: "15px",
                backgroundColor: "#eee",
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <div style={{
                  width: "100%",
                  height: "300px"
                }}>
                  <img 
                    src={destination.image} 
                    alt={destination.city} 
                    style={{ 
                      width: "100%",
                      height: "300px", 
                      objectFit: "cover", 
                      borderRadius: "10px" 
                    }} 
                  />
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}>
                  <div style={{
                    textAlign: "left",
                    flex: 1
                  }}>
                    <h3>{destination.city}</h3>
                    <p style={{ 
                      color: "#666",
                      fontSize: "0.9rem",
                      marginTop: "-20px"
                    }}>
                      {destination.country}
                    </p>
                  </div>
                  <div style={{
                    textAlign: "right",
                    flex: 1
                  }}>
                    <p style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      marginTop: "20px"
                    }}>
                      {destination.price}
                    </p>
                    <button 
                      onClick={() => navigate(`/details/${destination.id}`)}
                      style={{
                        marginTop: "0px",
                        padding: "10px 20px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        borderRadius: "5px"
                      }}>
                      More
                    </button>
                  </div>
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
            borderRadius: "5px"
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
        <h2>Contact Us</h2>
        <div>
          <div>
            <textarea 
            placeholder="Your e-mail..." 
            style={{ width: "30%", height: "15px", padding: "10px", marginTop: "10px" }}
          ></textarea>
          </div>
          <div>
            <textarea 
            placeholder="Your message..." 
            style={{ width: "50%", height: "90px", padding: "10px", marginTop: "10px" }}
          ></textarea>
          </div>
        </div>
        <br />
        <button 
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default LandingPage;