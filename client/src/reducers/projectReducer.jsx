import {
  GET_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  CREATE_PROJECT,
  FIND_PROJECT,
} from "../constants/actionTypes";

export const projectReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return { projects: payload };

    case CREATE_PROJECT:
      return { projects: [...state.projects, payload] };

    case UPDATE_PROJECT:
      return {
        projects: state.projects.map((project) =>
          project._id === payload._id ? payload : project
        ),
      };

    case DELETE_PROJECT:
      return {
        projects: state.projects.filter((project) => project._id !== payload),
      };

    default:
      return null;
  }
};
