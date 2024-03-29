import "./_projectCardSubContent.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmModal, ModalLayout } from "../Modal";
import { id } from "date-fns/locale";

const ProjectCardButtons = ({ project, setPosts }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate("/project/edit/" + project._id, { replace: true });
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenConfirm(true);
  };

  const handleModalClose = (e) => {
    e.stopPropagation();
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    const response = await fetch(
      process.env.REACT_APP_SERVER_BASE_URL +
        "/api/users/current_user/posts/" +
        project._id,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const json = await response.json();

    const { posts } = await json.updatedUser;

    setPosts(posts);
  };

  return (
    <div className="card-buttons">
      <button
        className="card-button button-edit"
        onClick={(e) => handleEditClick(e)}
      >
        Edit
      </button>
      <div
        className="card-button button-delete"
        onClick={(e) => handleDeleteClick(e)}
      >
        Delete
      </div>
      {openConfirm ? (
        <ModalLayout onClose={handleModalClose}>
          <DeleteConfirmModal
            onClose={handleModalClose}
            onDeleteConfirm={handleDeleteConfirm}
          />
        </ModalLayout>
      ) : null}
    </div>
  );
};

export default ProjectCardButtons;
