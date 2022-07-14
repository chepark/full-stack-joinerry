import { useEffect, useState } from "react";
import { UPDATE_USER } from "../constants/actionTypes";
import useUserContext from "./useUserContext";

const useLikeToggle = (projectId) => {
  const [likeToggle, setLikeToggle] = useState(false);
  const { user, dispatch } = useUserContext();

  useEffect(() => {
    if (user?.likes?.length > 0 && user.likes.includes(projectId))
      setLikeToggle(true);
    else setLikeToggle(false);
  }, [user]);

  const likeOrUnlike = async () => {
    if (Object.keys(user).length === 0) {
      console.log("Login first to like the project");
      return;
    }

    let likesArray = [];
    if (likeToggle) {
      // remove the duplicates from likes
      likesArray = user.likes.filter((like) => {
        return like !== projectId;
      });
      setLikeToggle(false);
    } else {
      // add the project in likes field
      likesArray =
        user.likes.length > 0 ? [...user.likes, projectId] : [projectId];
      setLikeToggle(true);
    }

    const response = await fetch(
      "http://localhost:4000/api/users/" + user._id,
      {
        method: "PATCH",
        body: JSON.stringify({ likes: likesArray }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = await response.json();
    const { updatedUser } = data;

    dispatch({ type: UPDATE_USER, payload: updatedUser });
  };

  return { likeToggle, likeOrUnlike };
};

export default useLikeToggle;
