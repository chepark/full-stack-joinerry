import { createContext, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: {} });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
