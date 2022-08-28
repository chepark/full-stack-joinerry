import React from "react";
import defaultProfileImage from "../../assets/profile.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export const ProfileModal = ({ creator }) => {
  const renderSocial = (social) => {
    switch (social) {
      case "linkedin":
        return (
          <LinkedInIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => window.open(creator.social.linkedin, "_blank")}
          />
        );
      case "twitter":
        return (
          <TwitterIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => window.open(creator.social.twitter, "_blank")}
          />
        );
      case "github":
        return (
          <GitHubIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => window.open(creator.social.github, "_blank")}
          />
        );
      default:
        return;
    }
  };

  const profileImageSrc = creator?.profileImage
    ? process.env.REACT_APP_SERVER_BASE_URL +
      "/api/users/current_user/profileImage/" +
      creator.profileImage
    : defaultProfileImage;

  return (
    <div className="profile-modal-wrapper">
      <div className="modal-creator-info">
        <div className="creator-info info__left">
          <div className="creator-image__frame">
            <img
              className="creater-image"
              alt="profile"
              src={profileImageSrc}
            />
          </div>
        </div>
        <div className="creator-info info__righ">
          <div>About the Project Creator</div>
          <div className="creator-name" data-section="modal">
            {creator?.userName || "no name"}
          </div>
          <div className="creator-social">
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
