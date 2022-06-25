import "./_projectCard.scss";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const ProjectCard = ({ project, children }) => {
  const { title, techStack, creator, roles } = project;
  let [capitalizedTitle, setCapitalizedTitle] = useState("");

  useEffect(() => {
    const capitalizeTitle = (title) => {
      return title.replace(/\b(\w)/g, (s) => s.toUpperCase());
    };

    setCapitalizedTitle(capitalizeTitle(title));
  }, [title]);

  return (
    <div className="project-card">
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
          [Open Position]
          {roles.map((role) => {
            return (
              <p className="role" key={uuidv4()}>
                {/* <div
                  className="role-opened"
                  data-isopened={role.isOpened}
                ></div> */}
                <p className="role-meta" data-isopened={role.isOpened}>
                  - {role.role}
                </p>
              </p>
            );
          })}
        </div>
      </div>
      <div className="card__subContent">{children}</div>
    </div>
  );
};

export default ProjectCard;
