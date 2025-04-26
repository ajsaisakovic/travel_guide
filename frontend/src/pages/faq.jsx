import React from "react";

const FAQPage = () => {
  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    }
  ];

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.mainContent}>
        <h1 style={styles.title}>GENERAL FAQS</h1>

        <div style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardTitle}>Question</div>
              <div style={styles.divider}></div>
              <div style={styles.cardText}>{faq.question}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: "#2b2b2b",
    minHeight: "100vh",
    minWidth: "99vw",
    margin: "0",     
    padding: "0",       
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  mainContent: {
    flex: 1,
    padding: "60px 20px",
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
    color: "#fff",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "60px",
    textTransform: "uppercase",
  },
  faqContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  card: {
    border: "1px solid #fff",
    padding: "30px 20px",
    width: "300px",
    backgroundColor: "transparent",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#fff",
    marginBottom: "20px",
  },
  cardText: {
    fontSize: "14px",
    color: "#fff",
    lineHeight: "1.5",
  },
};

export default FAQPage;
