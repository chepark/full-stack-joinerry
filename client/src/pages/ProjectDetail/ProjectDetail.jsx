import "./_projectDetail.scss";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Parser from "html-react-parser";

import { fetchProject } from "../../apis";
import { formatDate, avatarLetter } from "../../utils";

import useLikeToggle from "../../hooks/useLikeToggle";
import useWindowSize from "../../hooks/useWindowSize";

import OpeningStatus from "./OpeningStatus";
import {
  ProfileModal,
  SocialShareModal,
  ModalLayout,
} from "../../components/Modal";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Avatar } from "@mui/material";

const ProjectDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const shareUrl = location.pathname;

  const [project, setProject] = useState({});
  const [openShare, setOpenShare] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [windowHeight, windowWidth] = useWindowSize();
  const { likeToggle, likeOrUnlike } = useLikeToggle(id);

  useEffect(() => {
    fetchProject(id).then((project) => {
      setProject(project);
    });
  }, []);

  const handleCreatorClick = () => {
    setOpenProfile(true);
  };

  const handleShareClick = () => {
    setOpenShare(true);
  };

  const handleLikeClick = () => {
    likeOrUnlike();
  };

  // console.log("loc", location);

  return (
    <div
      className="container"
      data-section="main"
      style={{ height: windowHeight }}
    >
      <div className="content-wrapper" id="detail-wrapper">
        <div
          className="detail-backArrow"
          onClick={() => navigate("/", { replace: true })}
        >
          <ArrowBackIosIcon fontSize="large" />
          <div>Back to Home</div>
        </div>
        <div className="detail-card">
          <div className="detail-header-wrapper">
            <h2 className="detail-title">{project.title}</h2>
            <div className="detail-creator" onClick={handleCreatorClick}>
              created by
              <div className="creator-name">
                {project.creator?.userName
                  ? project.creator?.userName
                  : "no name"}
              </div>
              <Avatar>{avatarLetter(project.creator)}</Avatar>
            </div>
            {openProfile && (
              <ModalLayout
                onClose={() => {
                  setOpenProfile(false);
                }}
              >
                <ProfileModal
                  creator={project.creator}
                  onClose={() => {
                    setOpenProfile(false);
                  }}
                />
              </ModalLayout>
            )}
          </div>
          <div className="detail-icons-wrapper">
            <div
              className="detail-icon detail-icon__share"
              onClick={handleShareClick}
            >
              <IosShareIcon
                sx={{ color: "#d4d4d4", "&:hover": { color: "#717271" } }}
              />
            </div>
            {openShare ? (
              <ModalLayout
                onClose={(e) => {
                  e.preventDefault();
                  setOpenShare(false);
                }}
              >
                <SocialShareModal
                  shareUrl={shareUrl}
                  title={project.title}
                  summary={project.content.slice(0, 50)}
                />
              </ModalLayout>
            ) : null}
            <div
              className="detail-icon detail-icon__like"
              onClick={handleLikeClick}
            >
              {likeToggle ? (
                <FavoriteIcon sx={{ color: "#E15554" }} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "#d4d4d4", "&:hover": { color: "#717271" } }}
                />
              )}
            </div>
          </div>
          <div className="detail-about-wrapper">
            <div className="detail-about__left">
              <div className="detail-techStack">
                <div className="detail-subtitle">Tech Stack</div>
                {project?.techStack?.map((tech) => "#" + tech)}
              </div>
              <div className="detail-content">
                <div className="detail-subtitle">Description</div>
                <div>{Parser(`${project.content}`)}</div>
              </div>
            </div>

            <div className="detail-about__right">
              <div className="detail-submeta submeta__created">
                <div className="detail-subtitle">Posted On</div>
                <div className="detail-createdDate">
                  {formatDate(project.createdAt)}
                </div>
              </div>
              <div className="detail-submeta submeta__roles">
                <div className="detail-subtitle">Role Openings</div>
                {project?.roles?.map((role) => {
                  return (
                    <div key={uuidV4()} className="detail-role">
                      <div>{role.role}</div>
                      <OpeningStatus status={role.isOpened} />
                    </div>
                  );
                })}
              </div>
              <div className="detail-submeta submeta__period">
                <div className="detail-subtitle">Project Period</div>
                <div className="period-from">
                  From
                  <span className="project-date">
                    {project?.startDate
                      ? formatDate(project.startDate)
                      : "not specifed"}
                  </span>
                </div>
                <div className="period-to">
                  To
                  <span className="project-date">
                    {project?.endDate
                      ? formatDate(project.endDate)
                      : "not specifed"}
                  </span>
                </div>
              </div>
              <div className="detail-submeta">
                <div className="detail-subtitle">Contact</div>
                {project?.contact ? <div>{project.contact}</div> : <div>-</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
