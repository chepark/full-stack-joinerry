import React from "react";
import { useParams } from "react-router-dom";
import ProjectEditor from "../../components/ProjectEditor/ProjectEditor";

const EditProject = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <ProjectEditor mode="edit" projectId={id} />
    </div>
  );
};

export default EditProject;
