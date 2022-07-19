import "./_likes.scss";
import React, { useState, useEffect } from "react";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import ProjectCardMeta from "../../components/ProjectCardSubContent/ProjectCardMeta";

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [likeButtonClicked, setLikeButtonClicked] = useState(false);

  useEffect(() => {
    const fetchUserLikes = async () => {
      const response = await fetch(
        "http://localhost:4000/api/users/current_user/likes",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const json = await response.json();

      setLikes(json.likes);
    };

    fetchUserLikes();
  }, [likeButtonClicked]);

  return (
    <>
      {likes?.length === 0 ? (
        "no likes."
      ) : (
        <ProjectCards projects={likes}>
          <ProjectCardMeta
            setPosts={setLikes}
            likeButtonClicked={setLikeButtonClicked}
          />
        </ProjectCards>
      )}
    </>
  );
};

export default Likes;
