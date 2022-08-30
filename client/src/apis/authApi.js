export const logOut = async () => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/auth/logout"
  );
  const json = await response.json();

  return json;
};

export const fetchUser = async () => {
  try {
    console.log("fetch user");
    const response = await fetch(
      process.env.REACT_APP_SERVER_BASE_URL + "/api/users/current_user",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const json = await response.json();

    return json;
  } catch (error) {
    console.log("Errors in fetchUser: ", error);
  }
};

export const updateUser = async (newValue, cb) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/api/users/current_user/update",
    {
      method: "POST",
      body: newValue,
      credentials: "include",
    }
  );

  const json = await response.json();
  cb(json);
};

export const fetchUserLikes = async () => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/api/users/current_user/likes",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const json = await response.json();
  return json;
};

export const fetchUserPosts = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_BASE_URL + "/api/users/current_user/posts",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const json = await response.json();
    // setPosts(json.posts);
    return json;
  } catch (error) {
    console.log("Error occurs while fetching posts", error);
  }
};
