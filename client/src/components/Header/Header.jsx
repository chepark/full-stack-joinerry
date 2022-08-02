import "./_header.scss";

import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { LOGOUT_USER } from "../../constants/actionTypes";

import useUserContext from "../../hooks/useUserContext";
import useFetchUser from "../../hooks/useFetchUser";
import useprofileImageSrc from "../../hooks/useProfileImageSrc";

import Dropdown from "../Dropdown/Dropdown";
import { logOut } from "../../apis";

const Header = () => {
  const [isUserIn, setIsUserIn] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { user } = useFetchUser();
  const { dispatch } = useUserContext();
  const { profileImageSrc } = useprofileImageSrc();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?._id) return setIsUserIn(true);
    else setIsUserIn(false);
  }, [user]);

  const handleLogout = async () => {
    const json = await logOut();

    if (json.message === "success") {
      dispatch({ type: LOGOUT_USER });
      navigate("/login", { replace: true });
    }
  };

  if (pathname === "/success") return null;
  return (
    <header className="container" id="header">
      <div className="content-wrapper" data-section="header">
        <h1 id="logo">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black", fontSize: "18px" }}
          >
            Joinerry
          </Link>
        </h1>
        <div className="header-right">
          <div>
            <Link to="/project/create" style={{ textDecoration: "none" }}>
              + Create Project
            </Link>
          </div>

          {isUserIn && (
            <>
              <div
                className="header-profile"
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen);
                }}
              >
                <img alt={profileImageSrc} src={profileImageSrc} />

                {isDropDownOpen && (
                  <div className="header-dropdown">
                    <Dropdown logout={handleLogout} />
                  </div>
                )}
              </div>
            </>
          )}

          {!isUserIn && (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
