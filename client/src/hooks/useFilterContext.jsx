import { useContext } from "react";
import FilterContext from "../contexts/filterContext";

const useFilterContext = () => {
  const context = useContext(FilterContext);

  return context;
};

export default useFilterContext;
