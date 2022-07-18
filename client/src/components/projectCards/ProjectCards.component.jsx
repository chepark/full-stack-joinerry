import "./_projectCards.scss";
import { useRef } from "react";
import ProjectCard from "../ProjectCard/ProjectCard.component";
import ProjectCardMeta from "../ProjectCardSubContent/ProjectCardMeta";

const ProjectCards = ({ projects, lastProjectCardRef }) => {
  const observer = useRef();

  return (
    <>
      <div className="projects-wrapper">
        {projects?.map((project, index) => {
          if (projects.length === index + 1) {
            return (
              <ProjectCard
                ref={(node) => lastProjectCardRef(node, observer)}
                key={project._id}
                project={project}
              >
                <ProjectCardMeta />
              </ProjectCard>
            );
          } else {
            return (
              <ProjectCard key={project._id} project={project}>
                <ProjectCardMeta />
              </ProjectCard>
            );
          }
        })}
      </div>
    </>
  );
};

export default ProjectCards;
