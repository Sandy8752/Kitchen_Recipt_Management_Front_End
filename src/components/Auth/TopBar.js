import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar fixed-top navbar-light bg-white shadow rounded">
      <div className="container-fluid">
        <h4
          onClick={() => {
            navigate("/signin");
          }}
          className="mx-5"
          style={{ cursor: "pointer" }}
        >
          Kitchen Recipe Management
        </h4>
      </div>
    </nav>
  );
}