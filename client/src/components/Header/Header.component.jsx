import React from "react";
import "./_header.scss";

const Header = () => {
  return (
    <header className="container">
      <div className="content-wrapper" data-section="header">
        <h1 id="logo">Joinerry</h1>
        <div className="header-left">
          <div>+ Create Project</div>
          <div>Log In</div>
          <div>Sign Up</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
