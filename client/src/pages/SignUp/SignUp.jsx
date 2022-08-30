import "./_signup.scss";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import useUserContext from "../../hooks/useUserContext";
import { GET_USER } from "../../constants/actionTypes";
import { GoogleSvgIcon, GithubSvgIcon } from "../../assets/icons";

const SignUp = () => {
  const navigate = useNavigate();
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
    } catch (error) {
      // console.log("Errors in fetchUser: ", error);
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
          navigate("/");
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
          navigate("/");
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
        <h2>Sign Up</h2>

        <div className="auth-btns">
          <button className="auth-btn" onClick={redirectToGoogleSSO}>
            <GoogleSvgIcon />
            <div>Sign Up with Google</div>
          </button>
          <button
            className="auth-btn"
            id="github"
            onClick={redirectToGithubSSO}
          >
            <GithubSvgIcon />
            <div>Sign Up with Github</div>
          </button>
        </div>
        <div>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
