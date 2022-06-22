import React from "react";
import "./_home.scss";
import Banner from "../../components/banner/Banner.component";

const Home = () => {
  return (
    <>
      <Banner />
      <main className="container">
        <div className="content-wrapper" data-section="main-projects">
          <div className="techStack-tags">tech stack</div>
          <div className="projects">projects</div>
        </div>
      </main>
    </>
  );
};

export default Home;
