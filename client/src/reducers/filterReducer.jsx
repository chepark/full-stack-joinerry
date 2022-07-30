import {
  SET_CATEGORY,
  SET_TAGS,
  SET_PAGENUMBER,
  RESET_FILTERS,
} from "../constants/actionTypes";

export const filterInitialState = {
  category: "latest",
  tags: null,
  pageNumber: 1,
};

export const filterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORY:
      return { ...state, category: payload };
    case SET_TAGS:
      return { ...state, tags: payload };
    case SET_PAGENUMBER:
      return { ...state, pageNumber: payload };
    case RESET_FILTERS:
      return { filterInitialState };
    default:
      return state;
  }
};
