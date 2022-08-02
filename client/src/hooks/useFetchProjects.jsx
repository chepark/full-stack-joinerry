import { useEffect, useState, useCallback, useRef } from "react";

import useProjectContext from "./useProjectContext";
import useFilterContext from "./useFilterContext";

// import { fetchProj///ectsByFilter } from "../apis";
import {
  GET_PROJECTS,
  RESET_FILTERS,
  SET_PAGENUMBER,
} from "../constants/actionTypes";

const useFetchProjects = () => {
  const { projects, dispatch: projectDispatch } = useProjectContext();
  const {
    category,
    tags,
    pageNumber,
    dispatch: filterDispatch,
  } = useFilterContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [rendered, setRendered] = useState(false);

  const fetchProjectsByFilter = async (signal) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/projects/?" +
          new URLSearchParams(
            {
              category,
              tags,
              pageNumber,
            },
            { signal }
          )
      );
      const json = await response.json();

      if (response.ok) {
        pageNumber > 1
          ? projectDispatch({
              type: GET_PROJECTS,
              payload: [...projects, ...json.projects],
            })
          : projectDispatch({ type: GET_PROJECTS, payload: json.projects });

        setLoading(false);
        json.hasMore ? setHasMore(json.hasMore) : setHasMore(false);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return console.log("Request Aborted.");
      }
      setError(true);
      return error;
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchController = new AbortController();
    const { signal } = fetchController;

    fetchProjectsByFilter(signal);

    return fetchController.abort(signal);
  }, [category, tags, pageNumber]);

  return { loading, error, hasMore };
};

export default useFetchProjects;
