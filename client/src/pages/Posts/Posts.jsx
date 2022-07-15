import "./_posts.scss";
import useProjectContext from "../../hooks/useProjectContext";
import useUserContext from "../../hooks/useUserContext";
import useFetchProjects from "../../hooks/useFetchProjects";
import useFetchUser from "../../hooks/useFetchUser";

const Posts = () => {
  const { user } = useFetchUser();
  const postIDs = user?.posts;
  console.log("id", postIDs);
  const { loading, error, hasMore } = useFetchProjects(...Array(3), postIDs);

  return <div></div>;
};

export default Posts;
