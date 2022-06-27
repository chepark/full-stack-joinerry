import "./_projectCards.scss";
// import axios from "axios";
import { useEffect, useState } from "react";
import { GET_PROJECTS } from "../../constants/actionTypes";
import useProjectContext from "../../hooks/useProjectContext";
import ProjectCard from "../ProjectCard/ProjectCard.component";
import ProjectCardMeta from "../ProjectCardSubContent/ProjectCardMeta";

const ProjectCards = ({ category, techStackTags }) => {
  const { projects, dispatch } = useProjectContext();

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const response = await fetch("http://localhost:4000/api/projects");
  //     const projectsJson = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: GET_PROJECTS, payload: projectsJson });
  //     }
  //   };

  //   fetchProjects();
  // }, [dispatch]);

  useEffect(() => {
    const fetchProjectByFilter = async () => {
      const response = await fetch(
        "http://localhost:4000/api/projects/?" +
          new URLSearchParams({
            category: category,
            tags: techStackTags,
          })
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: GET_PROJECTS, payload: json });
      }
      console.log("testing filter: ", json);
    };
    fetchProjectByFilter();
  }, [category, techStackTags]);

  return (
    <>
      <div className="projects-wrapper">
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project}>
            {/* children elements */}
            <ProjectCardMeta />
          </ProjectCard>
        ))}
      </div>
      <div className="button-wrapper">
        <button>Load More</button>
      </div>
    </>
  );
};

export default ProjectCards;
