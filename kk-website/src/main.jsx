import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("KK website render error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "linear-gradient(150deg, #f7f9fc 0%, #eef2f7 100%)",
            color: "#13283d",
            fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
          }}
        >
          <div
            style={{
              width: "min(720px, 100%)",
              borderRadius: "24px",
              padding: "32px",
              background: "#ffffff",
              border: "1px solid rgba(201, 162, 39, 0.35)",
              boxShadow: "0 18px 50px rgba(11, 28, 45, 0.12)",
            }}
          >
            <div
              style={{
                marginBottom: "12px",
                color: "#c9a227",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              KK Group of Companies
            </div>
            <h1
              style={{
                margin: 0,
                color: "#0b1c2d",
                fontFamily: '"Libre Baskerville", Georgia, serif',
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                lineHeight: 1.2,
              }}
            >
              We hit a startup issue while loading the site.
            </h1>
            <p
              style={{
                margin: "16px 0 24px",
                color: "#2a435b",
                lineHeight: 1.7,
              }}
            >
              We cleared stale cache and tried to boot the app again. If this page is still blank,
              refresh once to load the latest deployment.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  border: "none",
                  borderRadius: "999px",
                  background: "#c9a227",
                  color: "#0b1c2d",
                  padding: "0.95rem 1.35rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Reload Page
              </button>
              <a
                href="/#/"
                style={{
                  borderRadius: "999px",
                  border: "1px solid rgba(11, 28, 45, 0.18)",
                  padding: "0.95rem 1.35rem",
                  fontWeight: 700,
                  color: "#0b1c2d",
                  background: "#ffffff",
                }}
              >
                Open Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    })
    .catch(() => {});
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </AppErrorBoundary>
  </React.StrictMode>
);
