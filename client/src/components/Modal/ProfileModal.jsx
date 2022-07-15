import React from "react";
import profileImage from "../../assets/profile.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

export const ProfileModal = ({ creator }) => {
  const onSocialClick = (social) => {
    let url = "";
    const instaBaseUrl = "https://www.instagram.com/";
    const linkedInBaseUrl = "https://www.linkedin.com/";
    const twitterBaseUrl = "https://twitter.com/";
    const githubBaseUrl = "https://github.com/";

    switch (social) {
      case "instagram":
        return (url = instaBaseUrl + creator.social.instagram);
      case "linkedin":
        return (url = linkedInBaseUrl + creator.social.linkedin);
      case "twitter":
        return (url = twitterBaseUrl + creator.social.twitter);
      case "github":
        return (url = githubBaseUrl + creator.social.github);
      default:
        return;
    }

    window.open(url);
  };

  const renderSocial = (social, username) => {
    switch (social) {
      case "instagram":
        return (
          <InstagramIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={onSocialClick("instagram")}
          />
        );
      case "linkedin":
        return (
          <LinkedInIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={onSocialClick("linkedin")}
          />
        );
      case "twitter":
        return (
          <TwitterIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={onSocialClick("twitter")}
          />
        );
      case "github":
        return (
          <GitHubIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={onSocialClick("github")}
          />
        );
      default:
        return;
    }
  };

  return (
    <div className="profile-modal-wrapper">
      <div className="modal-creator-info">
        <div className="creator-info info__left">
          <div className="creator-image__frame">
            <img
              className="creater-image"
              alt="profile"
              src={
                creator.profileImage?.length > 0
                  ? creator?.profileImage
                  : profileImage
              }
            />
          </div>
        </div>
        <div className="creator-info info__righ">
          <div>About the Project Creator</div>
          <div className="creator-name" data-section="modal">
            {creator?.userName || "no name"}
          </div>
          <div className="creator-social">
            {creator?.social?.instagram && renderSocial("instagram")}
            {creator?.social?.twitter && renderSocial("twitter")}
            {creator?.social?.linkedin && renderSocial("linkedin")}
            {creator?.social?.github && renderSocial("github")}
          </div>
          <div className="creator-email">{creator?.email}</div>
        </div>
      </div>
      <div className="creator-bio">{creator?.bio ? creator?.bio : null}</div>
      <div>
        <button className="modal-btn creator-done">DONE</button>
      </div>
    </div>
  );
};
