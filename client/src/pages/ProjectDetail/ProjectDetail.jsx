import "./_projectDetail.scss";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Parser from "html-react-parser";
import useWindowSize from "../../hooks/useWindowSize";
import formatDate from "../../utils/formatDate";
import avatarLetter from "../../utils/avatarLetter";
import useUserContext from "../../hooks/useUserContext";
import useLikeToggle from "../../hooks/useLikeToggle";
import OpeningStatus from "./OpeningStatus";
import { ProfileModal, SocialShareModal } from "../../components/Modal";
import { LikeFilled, LikeOutlined, ShareOutlined } from "../../assets/icons";
import { Avatar } from "@mui/material";
import ModalLayout from "../../components/Modal/ModalLayout";

const ProjectDetail = () => {
  const { id } = useParams();

  const location = useLocation();
  const shareUrl = location.pathname;

  const [project, setProject] = useState({});
  const [openShare, setOpenShare] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [windowHeight, windowWidth] = useWindowSize();
  const { likeToggle, likeOrUnlike } = useLikeToggle(id);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch("http://localhost:4000/api/projects/" + id);
      const json = await response.json();
      setProject(json);
    };

    fetchProject();
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

  return (
    <div
      className="container"
      data-section="main"
      style={{ height: windowHeight }}
    >
      <div className="content-wrapper" id="detail-wrapper">
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
                <ProfileModal creator={project.creator} />
              </ModalLayout>
            )}
          </div>
          <div className="detail-icons-wrapper">
            <div
              className="detail-icon detail-icon__share"
              onClick={handleShareClick}
            >
              <ShareOutlined />
            </div>
            {openShare ? (
              <ModalLayout
                onClose={(e) => {
                  e.preventDefault();
                  setOpenShare(false);
                }}
              >
                <SocialShareModal shareUrl={shareUrl} />
              </ModalLayout>
            ) : null}
            <div
              className="detail-icon detail-icon__like"
              onClick={handleLikeClick}
            >
              {likeToggle ? <LikeFilled /> : <LikeOutlined />}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;