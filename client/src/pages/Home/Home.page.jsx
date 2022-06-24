import { useEffect } from "react";
import { useState } from "react";

import Banner from "../../components/Banner/Banner.component";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.component";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";

import "./_home.scss";

const Home = () => {
  const [category, setCategory] = useState("latest");
  const [techStacks, setTechStacks] = useState(null);

  return (
    <>
      <Banner />
      <main className="container" data-sectioin="main-projects">
        <div className="content-wrapper" data-section="main-projects">
          <div className="techStack-tags">Tech Stack</div>
          <div className="projects">
            <CategoryMenu />
            <ProjectCards category={category} techStacks={techStacks} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
