import "./_dashboard.scss";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import useUserContext from "../../hooks/useUserContext";

const Dashboard = () => {
  const [windowHeight, windowWidth] = useWindowSize();
  const { user } = useUserContext();

  const [selected, setSelected] = useState({
    posts: true,
    likes: false,
    accountSetting: false,
  });

  const location = useLocation();

  useEffect(() => {
    let currentLocation = location.pathname.slice(11);
    if (currentLocation === "account-setting")
      currentLocation = "accountSetting";

    let tempSelected = {};
    for (const key in selected) {
      if (key === currentLocation) {
        tempSelected[key] = true;
      } else tempSelected[key] = false;
    }

    setSelected(tempSelected);
  }, [location]);

  const handleLinkClick = (e) => {
    const linkTitle = e.target.getAttribute("data-link");

    let tempSelected = {};
    for (const key in selected) {
      if (key === linkTitle) {
        tempSelected[key] = true;
      } else tempSelected[key] = false;
    }

    setSelected(tempSelected);
  };

  return (
    <div
      className="container"
      data-section="dashboard"
      style={{ minHeight: windowHeight }}
    >
      <div className="content-wrapper" data-setion="dashboard">
        <h2>Dashboard</h2>
        <div className="contents">
          <nav className="content-nav">
            <div className="nav-category">
              <Link
                className={`nav-link ${selected.posts ? "active" : ""}`}
                data-link="posts"
                to={"/dashboard/posts"}
                onClick={handleLinkClick}
              >
                Posts
              </Link>
            </div>
            <div className="nav-category">
              <Link
                className={`nav-link ${selected.likes ? "active" : ""}`}
                data-link="likes"
                to={"/dashboard/likes"}
                onClick={handleLinkClick}
              >
                Likes
              </Link>
            </div>
            <div className="nav-category">
              <Link
                className={`nav-link ${
                  selected.accountSetting ? "active" : ""
                }`}
                data-link="accountSetting"
                to={"/dashboard/account-setting"}
                onClick={handleLinkClick}
              >
                Account Setting
              </Link>
            </div>
          </nav>
          <div className="dashboard-cards-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
