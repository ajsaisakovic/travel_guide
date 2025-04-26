import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { first_name, last_name, email, password } = formData;
      const res = await axios.post("http://localhost:5000/api/v1/auth/signup", {
        first_name,
        last_name,
        email,
        password,
      });
      console.log(res.data);
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Error registering user.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <img src={Logo} alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.right}>
          <h1 style={styles.title}>REGISTER</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="profilePicture"
              placeholder="Profile picture url"
              value={formData.profilePicture}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "76vh",
    minWidth: "206vh",
    backgroundColor: "#f3eee5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
  },
  left: {
    flex: 1,
    width: "50%",
    display: "flex",
    padding: "0px 200px",
    marginLeft: "-400px",
  },
  logo: {
    height: "auto",
  },
  right: {
    flex: 1,
    display: "flex",
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "80px",
    fontWeight: "bold",
    marginTop: "0px",
    marginLeft: "-200px",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginTop: "-50px",
    gap: "15px",
  },
  input: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    width: "400px",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#2b2b2b",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default RegisterPage;
