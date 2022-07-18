import "./_home.scss";
import { useCallback } from "react";
import { useState } from "react";

import Banner from "../../components/Banner/Banner.component";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.component";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import Sidebar from "../../components/Sidebar/Sibebar.component";

import useProjectContext from "../../hooks/useProjectContext";
import useFetchProjects from "../../hooks/useFetchProjects";

const Home = () => {
  const [category, setCategory] = useState("latest");
  const [techStackTags, setTechStackTags] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { projects } = useProjectContext();
  const { loading, error, hasMore } = useFetchProjects(
    category,
    techStackTags,
    pageNumber
  );

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
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(hasMore.page);
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
          <Sidebar
            techStackTags={techStackTags}
            setTechStacks={setTechStackTags}
            setPageNumber={setPageNumber}
            category={category}
          />
          <div className="projects">
            <CategoryMenu
              setCategory={setCategory}
              setPageNumber={setPageNumber}
            />
            <ProjectCards
              lastProjectCardRef={lastProjectCardRef}
              projects={projects}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
