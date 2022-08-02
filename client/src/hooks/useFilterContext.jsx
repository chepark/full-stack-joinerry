import { useContext } from "react";
import FilterContext from "../contexts/filterContext";

const useFilterContext = () => {
  const context = useContext(FilterContext);
  console.log("filters", context);
  return context;
};

export default useFilterContext;
