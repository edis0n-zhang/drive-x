import React from "react";
import "./home.css";
import Link from "next/link";
import DriveX from "../../components/logo";

export default function Home() {
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="overlay-image"></div>

      <div className="content">
        <h1 className="main-text">
          Experience safe night driving with{" "}
          <span
            style={{
              fontSize: "40px",
              color: "#9B9DFF",
            }}
          >
            <DriveX />
          </span>
          <div className="button-container">
            <button className="gradient-button">
              <Link href="/drive">Let's drive</Link>
            </button>
            <Link href="/offer">
              <p className="offer-text"> ℹ️ see what we offer</p>
            </Link>
          </div>
        </h1>
      </div>
    </div>
  );
}
