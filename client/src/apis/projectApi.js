export const fetchProjectsByFilter = async (signal, query, cb) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_BASE_URL +
        "/api/projects/?" +
        new URLSearchParams(query, { signal })
    );
    // const json = await response.json();

    return response;
  } catch (error) {
    return error;
  }
};

export const fetchProject = async (projectId) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/api/projects/" + projectId
  );
  const json = await response.json();
  let project = json;

  return project;
};

export const createProject = async (project) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/api/projects",
    {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const editProject = async (project) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/api/projects/" + project._id,
    {
      method: "PUT",
      body: JSON.stringify(project),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
