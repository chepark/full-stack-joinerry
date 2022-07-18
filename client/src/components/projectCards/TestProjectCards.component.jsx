import "./_projectCards.scss";
import { useEffect, useState, useRef, useCallback } from "react";
import useProjectContext from "../../hooks/useProjectContext";
import ProjectCard from "../ProjectCard/ProjectCard.component";
import ProjectCardMeta from "../ProjectCardSubContent/ProjectCardMeta";
import useFetchProjects from "../../hooks/useFetchProjects";

const ProjectCards = ({
  category,
  techStackTags,
  pageNumber,
  setPageNumber,
}) => {
  const { projects } = useProjectContext();
  const { loading, error, hasMore } = useFetchProjects(
    category,
    techStackTags,
    pageNumber
  );

  const observer = useRef();
  const lastProjectCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0,
      };
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(hasMore.page);
        }
      }, option);

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="projects-wrapper">
        {projects?.map((project, index) => {
          if (projects.length === index + 1) {
            return (
              <ProjectCard
                ref={lastProjectCardRef}
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
