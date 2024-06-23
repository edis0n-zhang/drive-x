"use client";

import { useState } from "react";
import "../home.css";

export default function Page() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="home-container">
      <div className="solid-background"></div>
      <main className="flex-grow flex flex-col justify-center items-center px-6 pb-20 pt-20">
        <div className="w-full max-w-sm text-center pt-24">
          <p
            style={{
              position: "relative",
              zIndex: 2,
              top: "24%",
              left: "50%", // Adjusted to center horizontally
              transform: "translateX(-50%)",
              textAlign: "center",
              fontSize: "3.2rem",
            }}
          >
            ⚠️
          </p>
          <p
            style={{
              position: "relative",
              zIndex: 2,
              top: "22%",
              fontSize: "3.2rem",
              fontWeight: "bold",
              fontFamily: "Noto Sans, sans-serif",
              color: "#e7bf10",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Warning
          </p>
          <p
            style={{
              position: "relative",
              zIndex: 1,
              top: "20%",
              paddingLeft: "2%",
              paddingRight: "2%",
              fontSize: "2.2rem",
              fontFamily: "Noto Sans, sans-serif",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Be careful while driving, you may be drowsy!
          </p>
          <button
            onClick={() => setAcknowledged(true)}
            style={{
              marginTop: "180px",
              padding: "10px 20px",
              fontSize: "1.6rem",
              fontWeight: "bold",
              backgroundColor: "#e7bf10",
              color: "black",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              position: "relative",
              zIndex: 2,
            }}
          >
            Acknowledge
          </button>
        </div>
      </main>
    </div>
  );
}
