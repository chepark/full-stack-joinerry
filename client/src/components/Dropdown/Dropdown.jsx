import "./_dropdown.scss";
import { useNavigate, Link } from "react-router-dom";

const Dropdown = ({ logout }) => {
  const navigate = useNavigate();

  return (
    <div className="dropdown-wrapper">
      <div
        className="dropdown-menu"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/dashboard/posts", { replace: true });
        }}
      >
        {/* <Link className="dropdown-menu" to="/dashboard/posts"> */}
        Dashboard
        {/* </Link> */}
      </div>
      <div className="dropdown-menu" onClick={logout}>
        Log Out
      </div>
    </div>
  );
};

export default Dropdown;
