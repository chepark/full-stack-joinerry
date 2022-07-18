import "./_projectCardSubContent.scss";
import { useState } from "react";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";
import ModalLayout from "../Modal/ModalLayout";

const ProjectCardButtons = ({ project, setPosts }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
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
    console.log("delete confirm");
    const response = await fetch(
      "http://localhost:4000/api/users/current_user/posts/" + project._id,
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
