import React from "react";
import { useParams } from "react-router-dom";
import ProjectEditor from "../../components/ProjectEditor/ProjectEditor";
import TestProjectEditor from "../../components/ProjectEditor/TestProjectEditor";

const EditProject = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      {/* <ProjectEditor mode="edit" projectId={id} /> */}
      <TestProjectEditor mode="edit" projectId={id} />
    </div>
  );
};

export default EditProject;
