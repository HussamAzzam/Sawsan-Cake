import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: "48px 20px", textAlign: "center" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ marginTop: "12px", color: "var(--text)" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "24px",
          padding: "10px 20px",
          borderRadius: "8px",
          background: "var(--accent)",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
