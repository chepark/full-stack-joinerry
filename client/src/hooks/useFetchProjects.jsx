import { useEffect } from "react";
import { useState } from "react";
import useProjectContext from "./useProjectContext";
import { GET_PROJECTS } from "../constants/actionTypes";

const useFetchProjects = (category, tags, pageNumber) => {
  const { dispatch } = useProjectContext();

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
                category: category,
                tags: tags,
                page: pageNumber,
              },
              { signal }
            )
        );
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: GET_PROJECTS, payload: json });
          setLoading(false);
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
  }, [category, tags]);

  return { loading, error, hasMore };
};

export default useFetchProjects;
