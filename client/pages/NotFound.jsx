import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#4b5563",
            marginBottom: "1rem",
          }}
        >
          Oops! Page not found
        </p>
        <a
          href="/"
          style={{
            color: "#3b82f6",
            textDecoration: "underline",
          }}
          onMouseOver={(e) => (e.target.style.color = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.color = "#3b82f6")}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
