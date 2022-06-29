const getProjects = async (req, res) => {
  let query = {};

  const pageNumber = parseInt(req.query.pageNumber);
  const limit = 20;

  let projects;

  // create query object.
  if (req.query.category === "latest" && req.query.tags === "null") query = {};
  else {
    req.query.category !== "latest" && (query.category = req.query.category);
    req.query.tags !== "null" && (query.techStack = { $in: [req.query.tags] });
  }

  const numberOfDocuments = await Project.countDocuments(query).exec();
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = pageNumber * limit;
  let results = {};

  if (endIndex < numberOfDocuments) {
    results.next = {
      page: pageNumber + 1,
      limit: limit,
    };
  }

  results.projects = await Project.find(query)
    .limit(limit)
    .skip(startIndex)
    .sort({
      createdAt: -1,
    });
  console.log(results);
  res.status(200).json(results);
};

/// FIRST WORKING MODEL
// const getProjects = async (req, res) => {
//   let projects;
//   const pageNumber = parseInt(req.query.page);
//   const PAGE_SIZE = 20;

//   let query = {};

//   if (req.query.category === "latest" && req.query.tags === "null") {
//     query = {};
//   } else {
//     req.query.category !== "latest" && (query.category = req.query.category);
//     req.query.tags !== "null" && (query.techStack = { $in: [req.query.tags] });
//   }

//   projects = await Project.find(query)
//     .skip(PAGE_SIZE * (pageNumber - 1))
//     .limit(PAGE_SIZE)
//     .sort({ createdAt: -1 });
//   console.log(projects);
//   res.status(200).json(projects);
// };

// SECOND WORKING MODEL
// const getProjects = async (req, res) => {
//     let projects;
//     const pageNumber = parseInt(req.query.page);
//     const PAGE_SIZE = 20;

//     let query = {};

//     if (req.query.category === "latest" && req.query.tags === "null") {
//       query = {};
//     } else {
//       req.query.category !== "latest" && (query.category = req.query.category);
//       req.query.tags !== "null" && (query.techStack = { $in: [req.query.tags] });
//     }

//     projects = await Project.find(query)
//       .skip(PAGE_SIZE * (pageNumber - 1))
//       .limit(PAGE_SIZE)
//       .sort({ createdAt: -1 });
//     console.log("query:", req.query);

//     res.status(200).json(projects);
// }

useEffect(() => {
  setLoading(true);
  setError(false);
  // setPageNumber(1);

  const fetchController = new AbortController();
  const { signal } = fetchController;

  const fetchProjectsByFilter = async (signal) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/projects/?" +
          new URLSearchParams(
            {
              category: category,
              tags: tags,
              pageNumber: pageNumber,
            },
            { signal }
          )
      );
      const json = await response.json();
      const allProjects = [...new Set([...json.projects, ...projects])];

      if (response.ok) {
        dispatch({ type: GET_PROJECTS, payload: allProjects });
        setLoading(false);
        json.hasMore ? setHasMore(json.hasMore) : setHasMore(false);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return console.log("Request Aborted.");
      }
      setError(true);
      return error;
    }
  };

  fetchProjectsByFilter();

  return fetchController.abort(signal);
}, [pageNumber]);
