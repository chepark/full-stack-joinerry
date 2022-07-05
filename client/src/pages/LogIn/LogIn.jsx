import "./_login.scss";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import useUserContext from "../../hooks/useUserContext";
import { GET_USER } from "../../constants/actionTypes";
import { useEffect } from "react";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 40 40"
            >
              <g id="icons8-google" transform="translate(-4 -4)">
                <path
                  id="Path_58"
                  data-name="Path 58"
                  d="M43.611,20.083H42V20H24v8H35.3a12.009,12.009,0,1,1-3.342-12.961l5.657-5.657A19.979,19.979,0,1,0,44,24,20.136,20.136,0,0,0,43.611,20.083Z"
                  fill="#ffc107"
                />
                <path
                  id="Path_59"
                  data-name="Path 59"
                  d="M6.306,14.691l6.571,4.819a11.976,11.976,0,0,1,19.084-4.471l5.657-5.657A19.961,19.961,0,0,0,6.306,14.691Z"
                  fill="#ff3d00"
                />
                <path
                  id="Path_60"
                  data-name="Path 60"
                  d="M24,44a19.906,19.906,0,0,0,13.409-5.192l-6.19-5.238a11.969,11.969,0,0,1-18.5-5.516L6.2,33.079A19.984,19.984,0,0,0,24,44Z"
                  fill="#4caf50"
                />
                <path
                  id="Path_61"
                  data-name="Path 61"
                  d="M43.611,20.083H42V20H24v8H35.3a12.04,12.04,0,0,1-4.087,5.571l0,0,6.19,5.238A19.347,19.347,0,0,0,44,24,20.136,20.136,0,0,0,43.611,20.083Z"
                  fill="#1976d2"
                />
              </g>
            </svg>

            <div>Log In with Google</div>
          </button>
          <button className="auth-btn" id="github">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path
                id="icons8-github"
                d="M20.349,6a14.349,14.349,0,0,0-3.336,28.3c-.327-.078-.651-.165-.969-.264V30.752a4.38,4.38,0,0,1-1.256.179,3.26,3.26,0,0,1-3.049-2.69,2.794,2.794,0,0,0-.811-1.385c-.423-.377-.621-.379-.624-.508-.006-.271.363-.26.538-.26.9,0,1.577.954,1.892,1.448a2.545,2.545,0,0,0,2.054,1.422,3.164,3.164,0,0,0,1.323-.235,4.249,4.249,0,0,1,1.368-2.635c-3.365-.673-5.74-2.6-5.74-5.74a6.4,6.4,0,0,1,1.729-4.3,5.824,5.824,0,0,1-.294-1.977,6.485,6.485,0,0,1,.359-2.332,6.38,6.38,0,0,1,3.976,1.842,10.1,10.1,0,0,1,5.679,0,6.38,6.38,0,0,1,3.976-1.842,6.449,6.449,0,0,1,.359,2.332,6.915,6.915,0,0,1-.238,2.04,6.383,6.383,0,0,1,1.673,4.237c0,3.137-2.375,5.067-5.74,5.74a4.253,4.253,0,0,1,1.435,3.229V34.04c-.318.1-.641.187-.969.264A14.349,14.349,0,0,0,20.349,6Zm1,28.66c-.331.023-.664.039-1,.039C20.686,34.7,21.019,34.682,21.35,34.66Zm2.193-.322a14.317,14.317,0,0,1-1.973.306A14.4,14.4,0,0,0,23.542,34.337Zm-3.193.361c-.337,0-.67-.015-1-.039C19.68,34.682,20.012,34.7,20.349,34.7Zm-1.221-.055a14.309,14.309,0,0,1-1.972-.306A14.407,14.407,0,0,0,19.128,34.643Z"
                transform="translate(-6 -6)"
                fill="#fff"
              />
            </svg>

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
