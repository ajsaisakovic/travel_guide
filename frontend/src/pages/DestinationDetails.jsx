import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        galleryRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/destinations/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.data) throw new Error("No data received from server");
        if (response.data.status !== "success") throw new Error(response.data.message || "Server returned non-success status");
        if (!response.data.data?.destination) throw new Error("Destination data is missing in response");

        const destData = response.data.data.destination;
        
        if (typeof destData.images === 'string') {
          destData.images = destData.images.split(',').filter(img => img.trim() !== '');
        } else if (!Array.isArray(destData.images)) {
          destData.images = [];
        }

        if (destData.images.length === 0 && destData.primary_image) {
          destData.images = [destData.primary_image];
        }

        if (destData.start_date) destData.formattedStartDate = new Date(destData.start_date).toLocaleDateString();
        if (destData.end_date) destData.formattedEndDate = new Date(destData.end_date).toLocaleDateString();

        setDestination(destData);
        setError(null);
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError(err.response?.data?.message || err.message || "Failed to load destination");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!destination) return <NotFoundView />;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>{destination.name}</h1>
        <p style={styles.location}>
          {destination.city}, {destination.country} • {destination.continent}
        </p>

        <div style={styles.galleryWrapper}>
          {destination.images.length > 1 && (
            <>
              <button 
                onClick={() => scrollGallery('left')} 
                style={styles.scrollButtonLeft}
                aria-label="Scroll left"
              >
                ◀
              </button>
              <button 
                onClick={() => scrollGallery('right')} 
                style={styles.scrollButtonRight}
                aria-label="Scroll right"
              >
                ▶
              </button>
            </>
          )}
          
          <div style={styles.galleryContainer}>
            {destination.images.length > 0 ? (
              <div style={styles.imageScroller} ref={galleryRef}>
                {destination.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    style={styles.galleryImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                    }}
                  />
                ))}
              </div>
            ) : (
              <div style={styles.noImagePlaceholder}>
                <img
                  src="https://via.placeholder.com/800x400?text=No+Images+Available"
                  alt="No images available"
                  style={styles.placeholderImage}
                />
              </div>
            )}
          </div>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.descriptionBox}>
            <h2 style={styles.sectionTitle}>About this destination</h2>
            <p style={styles.descriptionText}>
              {destination.description || "No description available."}
            </p>
          </div>

          <div style={styles.detailsBox}>
            <h2 style={styles.sectionTitle}>Trip Details</h2>
            <div style={styles.detailsList}>
              <p><strong>Price:</strong> {destination.price} €</p>
              <p><strong>Duration:</strong> {destination.duration_days} days</p>
              {destination.start_date && (
                <p>
                  <strong>Dates:</strong> {destination.formattedStartDate} -{" "}
                  {destination.formattedEndDate}
                </p>
              )}
              {destination.max_participants && (
                <p>
                  <strong>Group size:</strong> Up to {destination.max_participants} people
                  {destination.current_participants > 0 && (
                    <span> ({destination.current_participants} booked)</span>
                  )}
                </p>
              )}
              {destination.is_featured && (
                <p style={styles.featuredBadge}>⭐ Featured Destination</p>
              )}
            </div>
          </div>
        </div>

        {destination.itinerary && (
          <div style={styles.itineraryBox}>
            <h2 style={styles.sectionTitle}>Itinerary</h2>
            <div style={styles.itineraryText}>
              {destination.itinerary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Pomocne komponente
const LoadingView = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.loadingContent}>
      <div style={styles.spinner}></div>
      <p>Loading destination details...</p>
    </div>
  </div>
);

const ErrorView = ({ error }) => (
  <div style={styles.errorContainer}>
    <div style={styles.errorContent}>
      <h2>Error loading destination</h2>
      <p>{error}</p>
      <p>Please try again later or contact support.</p>
      <Link to="/destinations" style={styles.backLink}>
        ← Back to Destinations
      </Link>
    </div>
  </div>
);

const NotFoundView = () => (
  <div style={styles.notFoundContainer}>
    <div style={styles.notFoundContent}>
      <h2>Destination not found</h2>
      <p>The requested destination could not be found.</p>
      <Link to="/destinations" style={styles.backLink}>
        ← Back to Destinations
      </Link>
    </div>
  </div>
);

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f5f5',
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '0',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '5px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  location: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  galleryWrapper: {
    position: 'relative',
    margin: '20px 0',
    width: "100%"
  },
  galleryContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    maxWidth: '1481.1px',
  },
  imageScroller: {
    display: 'flex',
    overflowX: 'auto',
    width: "100%",
    gap: '15px',
    padding: '10px 0',
    scrollbarWidth: 'thin',
    scrollBehavior: 'smooth',
  },
  scrollButtonLeft: {
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
  },
  scrollButtonRight: {
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
  },
  galleryImage: {
    height: '400px',
    minWidth: '300px',
    maxWidth: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  noImagePlaceholder: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '300px',
  },
  placeholderImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  infoGrid: {
    display: 'flex',
    gap: '30px',
    margin: '30px 0',
    flexWrap: 'wrap',
  },
  descriptionBox: {
    flex: 2,
    minWidth: '300px',
  },
  detailsBox: {
    flex: 1,
    minWidth: '250px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    alignSelf: 'flex-start',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#2c3e50',
    fontWeight: '500',
    borderBottom: '2px solid #3498db',
    paddingBottom: '5px',
  },
  descriptionText: {
    lineHeight: '1.6',
    fontSize: '1.1rem',
    color: '#555',
  },
  detailsList: {
    '& p': {
      marginBottom: '12px',
      fontSize: '1rem',
      color: '#333',
    },
    '& strong': {
      color: '#2c3e50',
      fontWeight: '500',
    },
  },
  itineraryBox: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '8px',
    margin: '30px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  itineraryText: {
    whiteSpace: 'pre-line',
    lineHeight: '1.6',
    fontSize: '1.1rem',
    color: '#555',
  },
  featuredBadge: {
    color: '#e67e22',
    fontWeight: 'bold',
    marginTop: '15px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingContent: {
    textAlign: 'center',
  },
  spinner: {
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  errorContent: {
    maxWidth: '500px',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    '& h2': {
      color: '#e74c3c',
      marginBottom: '15px',
    },
    '& p': {
      marginBottom: '15px',
      color: '#555',
    },
  },
  notFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  notFoundContent: {
    maxWidth: '500px',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    '& h2': {
      color: '#2c3e50',
      marginBottom: '15px',
    },
    '& p': {
      marginBottom: '15px',
      color: '#555',
    },
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '10px 15px',
    border: '1px solid #3498db',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#3498db',
      color: 'white',
      textDecoration: 'none',
    },
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default DestinationDetails;