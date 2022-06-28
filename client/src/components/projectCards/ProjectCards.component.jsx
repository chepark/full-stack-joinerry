import "./_projectCards.scss";
import { useEffect, useState, useRef, useCallback } from "react";
import { GET_PROJECTS } from "../../constants/actionTypes";
import useProjectContext from "../../hooks/useProjectContext";
import ProjectCard from "../ProjectCard/ProjectCard.component";
import ProjectCardMeta from "../ProjectCardSubContent/ProjectCardMeta";
import useFetchProjects from "../../hooks/useFetchProjects";

const ProjectCards = ({ category, techStackTags }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { projects } = useProjectContext();
  // const pageNumber = 1;

  const { loading, error, hasMore } = useFetchProjects(
    category,
    techStackTags,
    pageNumber
  );

  // useEffect(() => {
  //   const fetchProjectByFilter = async () => {
  //     const response = await fetch(
  //       "http://localhost:4000/api/projects/?" +
  //         new URLSearchParams({
  //           category: category,
  //           tags: techStackTags,
  //         })
  //     );
  //     const json = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: GET_PROJECTS, payload: json });
  //     }
  //     console.log("testing filter: ", json);
  //   };
  //   fetchProjectByFilter();
  // }, [category, techStackTags]);

  const observer = useRef();
  const lastProjectCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log("entries", entries);
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="projects-wrapper">
        {console.log("observer", observer.current)}
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
      <div className="button-wrapper">
        <button>Load More</button>
      </div>
    </>
  );
};

export default ProjectCards;
