import "./_projectCardSubContent.scss";

const ProjectCardButtons = ({ projectId }) => {
  return (
    <div className="card-buttons">
      <button>EDIT</button>
      <button>DELETE</button>
    </div>
  );
};

export default ProjectCardButtons;
