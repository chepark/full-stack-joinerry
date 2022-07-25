import React from "react";
import ProjectEditor from "../../components/ProjectEditor/ProjectEditor";
import TestProjectEditor from "../../components/ProjectEditor/TestProjectEditor";

const CreateProject = () => {
  return (
    <div>
      {/* <ProjectEditor mode="add" /> */}
      <TestProjectEditor mode="add" />
    </div>
  );
};

export default CreateProject;
