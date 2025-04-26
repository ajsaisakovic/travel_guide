import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", formData);
      console.log(res.data);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error logging in.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <img src={Logo} alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.right}>
          <h1 style={styles.title}>LOGIN</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
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
            <button type="submit" style={styles.button}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "70vh",
    minWidth: "206vh",
    backgroundColor: "#f3eee5",
    display: "flex",
  },
  container: {
    display: "flex",
  },
  left: {
    flex: 1,
    width: "50%",
    display: "flex",
    padding: "30px 200px",
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
    fontSize: "100px",
    fontWeight: "bold",
    marginBottom: "150px",
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

export default LoginPage;
