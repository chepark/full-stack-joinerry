import "./_projectCards.scss";
import React, { useRef } from "react";
import ProjectCard from "../ProjectCard/ProjectCard.component";

const ProjectCards = ({ projects, lastProjectCardRef, children }) => {
  const observer = useRef();

  return (
    <>
      <div className="projects-wrapper">
        {projects &&
          projects?.map((project, index) => {
            if (projects.length === index + 1) {
              return (
                <ProjectCard
                  ref={
                    lastProjectCardRef
                      ? (node) => lastProjectCardRef(node, observer)
                      : () => {
                          console.log("ref");
                        }
                  }
                  key={project._id}
                  project={project}
                >
                  {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { project });
                  })}
                </ProjectCard>
              );
            } else {
              return (
                <ProjectCard key={project._id} project={project}>
                  {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { project });
                  })}
                </ProjectCard>
              );
            }
          })}
      </div>
    </>
  );
};

export default ProjectCards;
