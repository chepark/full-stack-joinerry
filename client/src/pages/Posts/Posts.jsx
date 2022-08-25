import "./_posts.scss";
import { useEffect, useState } from "react";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import ProjectCardButtons from "../../components/ProjectCardSubContent/ProjectCardButtons";
import { fetchUserPosts } from "../../apis";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
