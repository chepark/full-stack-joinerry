import "./_projectCard.scss";
import { useState, useEffect } from "react";

const ProjectCard = ({ project }) => {
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
            return <p className="tag">#{tag}</p>;
          })}
        </div>
        <div className="roles">
          {roles.map((role) => {
            return (
              <p className="role" key={role._id}>
                <div
                  className="role-opened"
                  data-isopened={role.isOpened}
                ></div>
                <div className="role-meta" data-isopened={role.isOpened}>
                  {role.role}({role.number})
                </div>
              </p>
            );
          })}
        </div>
      </div>
      <div className="card__subContent">hello</div>
    </div>
  );
};

export default ProjectCard;
