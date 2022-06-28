import { useEffect, useState } from "react";
import "./_projectCardSubContent.scss";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const ProjectCardMeta = ({ userId, projectId }) => {
  const [meta, setMeta] = useState(null);
  const [likeToggle, setLikeToggle] = useState(false);

  useEffect(() => {
    // fetch creator data from backend
  }, []);

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const renderAvatar = () => {
    return meta?.profileImage ? (
      <Avatar alt={meta.userName} src={meta.profileImage} />
    ) : (
      <Avatar {...stringAvatar("John Doe")} />
    );
  };

  const likeButtonColor = likeToggle ? red : grey;

  return (
    <div className="card__meta">
      <p className="createdBy">created by</p>
      <div className="creator">
        <div className="creator-img">{renderAvatar()}</div>
        <p className="creator-name">Jonh Test</p>
      </div>
      <div className="like-button">
        <FavoriteIcon sx={{ color: likeButtonColor[400] }} />
      </div>
    </div>
  );
};

export default ProjectCardMeta;