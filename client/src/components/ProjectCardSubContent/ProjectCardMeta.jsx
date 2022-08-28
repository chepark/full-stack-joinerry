import "./_projectCardSubContent.scss";
import { useEffect } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import useLikeToggle from "../../hooks/useLikeToggle";
import useProfileImageSrc from "../../hooks/useProfileImageSrc";

const ProjectCardMeta = ({ project, likeButtonClicked }) => {
  const { likeToggle, likeOrUnlike } = useLikeToggle(project._id);
  const { profileImageSrc } = useProfileImageSrc(
    project?.creator?.profileImage
  );

  useEffect(() => {
    if (!likeButtonClicked) return;

    likeButtonClicked(false);
  }, [likeToggle]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    likeOrUnlike();
    // In Dashboard/likes,
    // user's likes are fetched again whenever it is invoked
    if (likeButtonClicked) likeButtonClicked(true);
  };

  return (
    <div className="card__meta">
      <div className="creator">
        <div className="creator-img">
          <img src={profileImageSrc} alt="profile" />
        </div>
        <p className="creator-name">{project?.creator?.userName || "John"}</p>
      </div>
      <div className="like-button" onClick={(e) => handleLikeClick(e)}>
        {likeToggle ? (
          <FavoriteIcon sx={{ color: "#E15554" }} />
        ) : (
          <FavoriteBorderIcon
            sx={{
              color: "#d4d4d4",
              "&:hover": { color: "#717271" },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCardMeta;
