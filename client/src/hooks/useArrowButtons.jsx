import { useNavigate, useLocation } from "react-router-dom";

const useArrowButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackButtonClick = () => {
    console.log("click");
    navigate(-1);
  };

  const handleForwardClick = () => {
    navigate(1);
  };

  return { handleBackButtonClick, handleForwardClick };
};

export default useArrowButtons;
