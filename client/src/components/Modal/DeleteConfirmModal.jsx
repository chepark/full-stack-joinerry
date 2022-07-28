import "./_modalLayout.scss";
import React from "react";

export const DeleteConfirmModal = ({ onClose, onDeleteConfirm }) => {
  return (
    <div className="delete-confirm-wrapper">
      <div>Are you sure you want to delete the post?</div>
      <div className="modal-buttons">
        <button
          className="modal-btn modal-delete-confirm"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteConfirm();
          }}
        >
          Delete
        </button>
        <button
          className="modal-btn modal-cancel-confirm"
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
