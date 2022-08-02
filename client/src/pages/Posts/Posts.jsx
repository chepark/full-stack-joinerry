import "./_posts.scss";
import { useEffect, useState } from "react";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import ProjectCardButtons from "../../components/ProjectCardSubContent/ProjectCardButtons";
import { fetchUserPosts } from "../../apis";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // const fetchUserPosts = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:4000/api/users/current_user/posts",
    //       {
    //         method: "GET",
    //         credentials: "include",
    //       }
    //     );

    //     const json = await response.json();
    //     setPosts(json.posts);
    //   } catch (error) {
    //     console.log("Error occurs while fetching posts", error);
    //   }
    // };

    fetchUserPosts().then((json) => {
      setPosts(json.posts);
    });
  }, []);

  return (
    <>
      {posts?.length === 0 ? (
        "no posts."
      ) : (
        <ProjectCards projects={posts}>
          <ProjectCardButtons setPosts={setPosts} />
        </ProjectCards>
      )}
    </>
  );
};

export default Posts;
