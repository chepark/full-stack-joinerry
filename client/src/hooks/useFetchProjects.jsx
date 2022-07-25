import { useEffect } from "react";
import { useState } from "react";
import useProjectContext from "./useProjectContext";
import { GET_PROJECTS } from "../constants/actionTypes";

const useFetchProjects = (category, tags, pageNumber, userData) => {
  const { projects, dispatch } = useProjectContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchController = new AbortController();
    const { signal } = fetchController;

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
            ? dispatch({
                type: GET_PROJECTS,
                payload: [...projects, ...json.projects],
              })
            : dispatch({ type: GET_PROJECTS, payload: json.projects });

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

    fetchProjectsByFilter();

    return fetchController.abort(signal);
  }, [category, tags, pageNumber]);

  return { loading, error, hasMore };
};

export default useFetchProjects;
