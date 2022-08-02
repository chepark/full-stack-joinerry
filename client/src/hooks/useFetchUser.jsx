import { useEffect } from "react";
import useUserContext from "./useUserContext";
import { GET_USER } from "../constants/actionTypes";
import { fetchUser } from "../apis";

const useFetchUser = (query) => {
  const { user, dispatch } = useUserContext();

  useEffect(() => {
    fetchUser().then((json) => {
      dispatch({ type: GET_USER, payload: json });
    });
  }, []);

  return { user };
};

export default useFetchUser;
