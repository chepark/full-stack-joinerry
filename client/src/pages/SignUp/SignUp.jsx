import "./_signup.scss";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize";

const SignUp = () => {
  const [windowHeight, windowWidth] = useWindowSize();
  const HEADER_FOOTER_HEIGHTS = 198;

  return (
    <div
      className="container"
      style={{ height: windowHeight - HEADER_FOOTER_HEIGHTS }}
    >
      <div className="content-wrapper">
        <h2>Sign Up</h2>
      </div>
    </div>
  );
};

export default SignUp;
