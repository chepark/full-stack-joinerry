import "./_likes.scss";
import React, { useState, useEffect } from "react";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import ProjectCardMeta from "../../components/ProjectCardSubContent/ProjectCardMeta";
import { fetchUserLikes } from "../../apis";

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [likeButtonClicked, setLikeButtonClicked] = useState(false);

  useEffect(() => {
    fetchUserLikes().then((json) => {
      setLikes(json.likes);
    });
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
