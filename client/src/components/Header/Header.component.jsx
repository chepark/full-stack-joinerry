import "./_header.scss";

import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import avatarLetter from "../../utils/avatarLetter";
import { LOGOUT_USER } from "../../constants/actionTypes";
import useUserContext from "../../hooks/useUserContext";
import useFetchUser from "../../hooks/useFetchUser";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useFetchUser();
  const { dispatch } = useUserContext();
  const [isUserIn, setIsUserIn] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    if (user?._id) return setIsUserIn(true);
    else setIsUserIn(false);
  }, [user]);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:4000/auth/logout");
    const json = await response.json();

    if (json.message === "success") {
      dispatch({ type: LOGOUT_USER });
      navigate("/login");
    }
  };

  if (pathname === "/success") return null;
  return (
    <header className="container" id="header">
      {console.log("dropdown", isDropDownOpen)}
      <div className="content-wrapper" data-section="header">
        <h1 id="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
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
                <Avatar>{avatarLetter(user)}</Avatar>
                <ArrowDropDownIcon />
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
