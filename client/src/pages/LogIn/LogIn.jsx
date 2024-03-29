import "./_login.scss";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import useUserContext from "../../hooks/useUserContext";
import { GET_USER } from "../../constants/actionTypes";
import { useEffect } from "react";
import { GoogleSvgIcon, GithubSvgIcon } from "../../assets/icons";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { user, dispatch } = useUserContext();
  const [windowHeight, windowWidth] = useWindowSize();

  const fetchUser = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_BASE_URL + "/api/users/current_user",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const json = await response.json();
      dispatch({ type: GET_USER, payload: json });
      navigate(from, { replace: true });
    } catch (error) {
      console.log("Errors in fetchUser: ", error);
    }
  };

  const redirectToGoogleSSO = async (e) => {
    e.preventDefault();
    let timer;

    const googleLoginUrl =
      process.env.REACT_APP_SERVER_BASE_URL + "/auth/google";
    const newWindow = window.open(googleLoginUrl, "", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchUser();
          if (timer) clearInterval(timer);

          navigate("/", { replace: true });
        }
      }, 500);
    }
  };

  const redirectToGithubSSO = async (e) => {
    e.preventDefault();
    let timer;

    const githubLoginUrl =
      process.env.REACT_APP_SERVER_BASE_URL + "/auth/github";
    const newWindow = window.open(githubLoginUrl, "", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchUser();
          if (timer) clearInterval(timer);

          navigate("/", { replace: true });
        }
      }, 500);
    }
  };

  return (
    <div
      className="container"
      data-section="main"
      style={{ height: windowHeight }}
    >
      <div className="content-wrapper">
        <h2>Log In</h2>

        <div className="auth-btns">
          <button className="auth-btn" onClick={redirectToGoogleSSO}>
            <GoogleSvgIcon />

            <div>Log In with Google</div>
          </button>
          <button
            className="auth-btn"
            id="github"
            onClick={redirectToGithubSSO}
          >
            <GithubSvgIcon />
            <div>Log In with Github</div>
          </button>
        </div>
        <div>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
