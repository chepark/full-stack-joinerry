import "./_projectCard.scss";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, children }, ref) => {
  const { title, techStack, _id } = project;
  let [capitalizedTitle, setCapitalizedTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const capitalizeTitle = (title) => {
      return title.replace(/\b(\w)/g, (s) => s.toUpperCase());
    };

    setCapitalizedTitle(capitalizeTitle(title));
  }, [title]);

  const handleCardClick = () => {
    navigate("/project/" + _id, { replace: true });
  };

  return (
    <div className="project-card" ref={ref} onClick={handleCardClick}>
      <div className="card__mainContent">
        <h2 className="card__title">{title && capitalizedTitle}</h2>
        <div className="tags">
          {techStack.map((tag) => {
            return (
              <p key={uuidv4()} className="tag">
                #{tag}
              </p>
            );
          })}
        </div>
        <div className="roles">
          {/* {roles.map((role) => {
            return (
              <div className="role" key={uuidv4()}>
                <div
                  className="role-opened"
                  data-isopened={role.isOpened}
                ></div>
                <p className="role-meta" data-isopened={role.isOpened}>
                  - {role.role}
                </p>
              </div>
            );
          })} */}
        </div>
      </div>
      <div className="card__subContent">{children}</div>
    </div>
  );
};
const forwarededProjectCard = forwardRef(ProjectCard);

export default forwarededProjectCard;
