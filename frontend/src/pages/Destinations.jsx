import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const continents = ["All", "Europe", "Asia", "Africa", "North America", "South America", "Oceania"];
const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "duration-asc", label: "Duration (Short to Long)" },
  { value: "duration-desc", label: "Duration (Long to Short)" }
];

const DestinationsPage = () => {
  const navigate = useNavigate();
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        let url = 'http://localhost:5000/api/v1/destinations';
        
        const params = new URLSearchParams();
        if (selectedContinent !== "All") params.append('continent', selectedContinent);
        if (searchQuery) params.append('search', searchQuery);
        
        const response = await axios.get(`${url}?${params.toString()}`);
        
        if (response.data?.status === "success") {
          let filteredDestinations = response.data.data.destinations;
          filteredDestinations = sortDestinations(filteredDestinations, sortBy);
          setDestinations(filteredDestinations);
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
  }, [selectedContinent, searchQuery, sortBy]);

  const sortDestinations = (destinations, sortOption) => {
    const [key, order] = sortOption.split('-');
    return [...destinations].sort((a, b) => {
      let comparison = 0;
      
      if (key === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (key === 'price') {
        comparison = parseFloat(a.price) - parseFloat(b.price);
      } else if (key === 'duration') {
        comparison = a.duration_days - b.duration_days;
      }
      
      return order === 'desc' ? -comparison : comparison;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const styles = {
    destinationContainer: {
      width: "210vh",
      maxWidth: "206.15vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    },
    controlsSection: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginBottom: "30px",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    filters: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    filterButton: {
      padding: "8px 16px",
      border: "1px solid #ddd",
      background: "white",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "all 0.3s",
      fontSize: "14px"
    },
    activeFilterButton: {
      background: "#007bff",
      color: "white",
      borderColor: "#007bff",
    },
    searchSort: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      alignItems: "center",
    },
    searchForm: {
      display: "flex",
      flexGrow: 1,
      minWidth: "250px",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
      flexGrow: 1,
      fontSize: "14px"
    },
    searchButton: {
      padding: "8px 16px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      cursor: "pointer",
      fontSize: "14px"
    },
    sortSelect: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      minWidth: "200px",
      fontSize: "14px"
    },
    destinationsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "25px",
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px 0"
    },
    destinationCard: {
      border: "1px solid #eee",
      borderRadius: "8px",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backgroundColor: "white",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    imageContainer: {
      height: "200px",
      overflow: "hidden",
      position: "relative"
    },
    cardImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease"
    },
    cardContent: {
      padding: "15px",
    },
    cardTitle: {
      margin: "0 0 5px 0",
      fontSize: "1.2rem",
      color: "#333"
    },
    cardLocation: {
      margin: "0 0 10px 0",
      color: "#666",
      fontSize: "0.9rem"
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "15px",
      fontSize: "0.9rem"
    },
    cardPrice: {
      fontWeight: "bold",
      color: "#007bff",
      fontSize: "1rem"
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      fontSize: "1.2rem",
      color: "#333"
    },
    error: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "white",
      maxWidth: "500px",
      margin: "50px auto",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    errorText: {
      color: "red",
      marginBottom: "20px",
      fontSize: "1rem"
    },
    retryButton: {
      padding: "10px 20px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem"
    },
    noResults: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      maxWidth: "1400px",
      margin: "0 auto"
    },
    resetButton: {
      padding: "10px 20px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "15px"
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading destinations...</div>;
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p style={styles.errorText}>{error}</p>
        <button style={styles.retryButton} onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={styles.destinationContainer}>
      <div style={styles.controlsSection}>
        <div style={styles.filters}>
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              style={selectedContinent === continent ? 
                {...styles.filterButton, ...styles.activeFilterButton} : 
                styles.filterButton}
            >
              {continent}
            </button>
          ))}
        </div>

        <div style={styles.searchSort}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.destinationsGrid}>
        {destinations.length === 0 ? (
          <div style={styles.noResults}>
            <p>No destinations found. Try changing your filters.</p>
            <button 
              style={styles.resetButton}
              onClick={() => {
                setSelectedContinent("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          destinations.map((destination) => (
            <div 
              key={destination.id} 
              style={styles.destinationCard}
              onClick={() => navigate(`/details/${destination.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}
            >
              <div style={styles.imageContainer}>
                <img 
                  src={destination.primary_image || "https://via.placeholder.com/300x200?text=No+Image"} 
                  alt={destination.name}
                  style={styles.cardImage}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = ""}
                />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{destination.name}</h3>
                <p style={styles.cardLocation}>{destination.city}, {destination.country}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>{destination.price} €</span>
                  <span>{destination.duration_days} days</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;