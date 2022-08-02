import "./_home.scss";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import Banner from "../../components/Banner/Banner.component";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.component";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import Sidebar from "../../components/Sidebar/Sibebar.component";

import useProjectContext from "../../hooks/useProjectContext";
import useFetchProjects from "../../hooks/useFetchProjects";
import ProjectCardMeta from "../../components/ProjectCardSubContent/ProjectCardMeta";
import useFilterContext from "../../hooks/useFilterContext";
import { RESET_FILTERS, SET_PAGENUMBER } from "../../constants/actionTypes";

const Home = () => {
  const location = useLocation();
  const { projects } = useProjectContext();
  const { category, tags, pageNumber, dispatch } = useFilterContext();
  const { loading, error, hasMore } = useFetchProjects();

  useEffect(() => {
    return () => dispatch({ type: RESET_FILTERS });
  }, []);

  const lastProjectCardRef = useCallback(
    (node, observer) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0,
      };
      observer.current = new IntersectionObserver((entries) => {
        // Change the login? to much rerender?
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: SET_PAGENUMBER, payload: hasMore.page });
        }
      }, option);

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <Banner />
      <main className="container" data-sectioin="main-projects">
        <div className="content-wrapper" data-section="main-projects">
          <Sidebar />
          <div className="projects">
            <CategoryMenu />
            <ProjectCards
              lastProjectCardRef={lastProjectCardRef}
              projects={projects}
            >
              <ProjectCardMeta />
            </ProjectCards>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
