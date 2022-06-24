import { useContext } from "react";
import { ProjectContext } from "../contexts/projectContext";

const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw Error(
      "useProjectContext must be used inside a ProjectContextProvider"
    );
  }

  return context;
};

export default useProjectContext;
