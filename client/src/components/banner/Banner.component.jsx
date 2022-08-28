import "./_banner.scss";
import useWindowSize from "../../hooks/useWindowSize";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="container" data-section="banner">
      <div className="content-wrapper" data-section="banner">
        <div className="banner-textContent">
          <div className="banner-text__title">
            Find Teams and Side Projects{" "}
          </div>
          <div className="banner-text__subTitle">
            Exciting place to level up portfolio with future developers.
          </div>
          <Link className="banner-button btn-primary" to="/faq">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
