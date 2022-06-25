import { useEffect } from "react";
import { useState } from "react";

import Banner from "../../components/Banner/Banner.component";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.component";
import ProjectCards from "../../components/ProjectCards/ProjectCards.component";
import Sidebar from "../../components/Sidebar/Sibebar.component";

import "./_home.scss";

const Home = () => {
  const [category, setCategory] = useState("latest");
  const [techStackTags, setTechStackTags] = useState(null);

  return (
    <>
      <Banner />
      <main className="container" data-sectioin="main-projects">
        <div className="content-wrapper" data-section="main-projects">
          <Sidebar
            techStackTags={techStackTags}
            setTechStacks={setTechStackTags}
          />
          <div className="projects">
            <CategoryMenu setCategory={setCategory} />
            <ProjectCards category={category} techStackTags={techStackTags} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
