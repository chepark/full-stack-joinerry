import { useEffect } from "react";
import { GET_USER } from "../constants/actionTypes";
import useUserContext from "./useUserContext";

const useFetchUser = (query) => {
  const { user, dispatch } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/current_user",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const json = await response.json();

        console.log("user", json);
        dispatch({ type: GET_USER, payload: json });
      } catch (error) {
        console.log("Errors in fetchUser: ", error);
      }
    };

    fetchUser();
  }, []);

  // !!working on here

  return { user };
};

export default useFetchUser;
