import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUsertContext must be used inside a UserContextProvider");
  }

  return context;
};

export default useUserContext;
