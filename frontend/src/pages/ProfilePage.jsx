import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Dohvati podatke o korisniku iz localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Ako korisnik nije prijavljen, preusmjeri ga na login stranicu
      window.location.href = "/login";
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Profile Page</h1>
      <div style={styles.profileInfo}>
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
  );

  function handleLogout() {
    // Izbriši korisničke podatke iz localStorage i preusmjeri na login stranicu
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minWidth: "202.8vh",
    minHeight: "70.7vh",

  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  profileInfo: {
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#2b2b2b",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ProfilePage;
