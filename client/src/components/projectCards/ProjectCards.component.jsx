import "./_projectCards.scss";

import { useEffect } from "react";
import { GET_PROJECTS } from "../../constants/actionTypes";
import useProjectContext from "../../hooks/useProjectContext";
import ProjectCard from "../ProjectCard/ProjectCard.component";

const ProjectCards = ({ category, techStacks }) => {
  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:4000/api/projects");
      const projectsJson = await response.json();

      if (response.ok) {
        dispatch({ type: GET_PROJECTS, payload: projectsJson });
      }
    };

    fetchProjects();
  }, [dispatch]);

  return (
    <div className="projects-wrapper">
      {projects &&
        projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
    </div>
  );
};

export default ProjectCards;
