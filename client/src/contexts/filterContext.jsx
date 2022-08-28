import { createContext, useReducer } from "react";

import { filterInitialState, filterReducer } from "../reducers/filterReducer";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
