import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./_header.scss";

const Header = () => {
  const { pathname } = useLocation();

  if (pathname === "/success") return null;
  return (
    <header className="container" id="header">
      <div className="content-wrapper" data-section="header">
        <h1 id="logo">Joinerry</h1>
        <div className="header-left">
          <div>+ Create Project</div>

          <div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </div>

          <div>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
