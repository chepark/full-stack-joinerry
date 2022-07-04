import { GET_USER, UPDATE_USER } from "../constants/actionTypes";

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return { user: payload };

    default:
      return state;
  }
};
