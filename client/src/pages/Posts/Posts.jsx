import "./_posts.scss";
import { useEffect, useState } from "react";

import useFetchUser from "../../hooks/useFetchUser";

const Posts = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/current_user/posts",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const json = await response.json();
        setPosts(json.posts);
      } catch (error) {
        console.log("Error occurs while fetching posts", error);
      }
    };

    fetchUserProjects();
  }, []);

  return <div>{console.log("Posts", posts)}</div>;
};

export default Posts;
