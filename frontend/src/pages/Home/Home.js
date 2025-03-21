import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="border flex py-2 justify-between items-center px-32">
        <Link
          to="/"
          className="text-decoration-none text-black font-bold text-3xl"
        >
          LOGO
        </Link>
        <button className="">About</button>
      </div>

      <h1 className="description">A Yoga AI Trainer</h1>
      <div className="home-main">
        <div className="btn-section">
          <Link to="/start">
            <button className="btn start-btn">Let's Start</button>
          </Link>
          <Link to="/tutorials">
            <button className="btn start-btn">Tutorials</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
