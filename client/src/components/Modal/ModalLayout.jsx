import "./_modalLayout.scss";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

const ModalLayout = ({ onClose, children }) => {
  return createPortal(
    <>
      <div className="modal-overlay">
        <div className="modal-content-wrapper">
          <button className="modal-btn modal-btn__close" onClick={onClose}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ModalLayout;
