import "./_banner.scss";
import bannerImage from "../../assets/banner-image.png";

const Banner = () => {
  return (
    <div className="container" data-section="banner">
      <div className="content-wrapper" data-section="banner">
        <div className="banner-textContent">
          Welcome to Joinerry! <br />
          Community to find a team for side projects.
        </div>
        <div className="banner-imageContent">
          <img src={bannerImage} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
