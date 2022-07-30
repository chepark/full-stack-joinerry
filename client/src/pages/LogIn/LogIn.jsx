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
        "http://localhost:4000/api/users/current_user",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const json = await response.json();
      dispatch({ type: GET_USER, payload: json });
      navigate(from, { replace: true });
      console.log(json);
    } catch (error) {
      console.log("Errors in fetchUser: ", error);
    }
  };

  const redirectToGoogleSSO = async (e) => {
    e.preventDefault();
    let timer;

    const googleLoginUrl = "http://localhost:4000/auth/google";
    const newWindow = window.open(googleLoginUrl, "", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchUser();
          if (timer) clearInterval(timer);
          // console.log("from", from);
          navigate("/", { replace: true });
        }
      }, 500);
    }
  };

  const redirectToGithubSSO = async (e) => {
    e.preventDefault();
    let timer;

    const githubLoginUrl = "http://localhost:4000/auth/github";
    const newWindow = window.open(githubLoginUrl, "", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchUser();
          if (timer) clearInterval(timer);
          // console.log("from", from);
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
