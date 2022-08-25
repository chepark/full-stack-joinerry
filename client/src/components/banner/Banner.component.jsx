import "./_banner.scss";
import useWindowSize from "../../hooks/useWindowSize";

const Banner = () => {
  const [windowHeight, windowWidth] = useWindowSize();

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
        </div>
        {/* <div className="banner-imageContent">
          <img src={bannerImage} alt="banner" />
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
