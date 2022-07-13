import "./_projectDetail.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Parser from "html-react-parser";
import useWindowSize from "../../hooks/useWindowSize";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [windowHeight, windowWidth] = useWindowSize();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch("http://localhost:4000/api/projects/" + id);
      const json = await response.json();
      setProject(json);
    };

    fetchProject();
  }, []);

  return (
    <div
      className="container"
      data-section="main"
      style={{ height: windowHeight }}
    >
      <div className="content-wrapper">
        <div className="detail-card">
          <div className="detail-header-wrapper">
            <h2 className="detail-title">{project.title}</h2>
            <div className="detail-creator"></div>
          </div>
          <div className="detail-icons-wrapper">
            <div className="detail-icon detail-icon__share">
              <svg
                id="ios_share_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="33.43"
                height="33.762"
                viewBox="0 0 33.43 33.762"
              >
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M0,0H33.43V33.762H0Z"
                  fill="none"
                />
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M20.715,6.627l-1.978,2L16.522,6.388V22.1H13.764V6.388L11.55,8.625l-1.978-2L15.143,1Zm5.572,7.034V29.135A2.808,2.808,0,0,1,23.5,31.949H6.786A2.8,2.8,0,0,1,4,29.135V13.661a2.79,2.79,0,0,1,2.786-2.814h4.179v2.814H6.786V29.135H23.5V13.661H19.322V10.847H23.5A2.8,2.8,0,0,1,26.287,13.661Z"
                  transform="translate(1.572 0.407)"
                  fill="#a7aaaa"
                />
              </svg>
            </div>
            <div className="detail-icon detail-icon__like">
              <svg
                id="favorite_border_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="33.43"
                height="33.762"
                viewBox="0 0 33.43 33.762"
              >
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M0,0H33.43V33.762H0Z"
                  fill="none"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M22.2,3a8.308,8.308,0,0,0-6.268,2.94A8.308,8.308,0,0,0,9.661,3,7.625,7.625,0,0,0,2,10.737c0,5.318,4.736,9.65,11.91,16.234l2.02,1.843,2.02-1.857c7.174-6.57,11.91-10.9,11.91-16.22A7.625,7.625,0,0,0,22.2,3ZM16.069,24.875l-.139.141-.139-.141c-6.63-6.063-11-10.072-11-14.138A4.784,4.784,0,0,1,9.661,5.814a5.445,5.445,0,0,1,4.973,3.32h2.6A5.411,5.411,0,0,1,22.2,5.814a4.784,4.784,0,0,1,4.875,4.924C27.073,14.8,22.7,18.812,16.069,24.875Z"
                  transform="translate(0.786 1.22)"
                  fill="#a7aaaa"
                />
              </svg>
            </div>
          </div>
          <div className="detail-about-wrapper">
            <div className="detail-about__left">
              <div className="detail-techStack">
                <div className="detail-subtitle">Tech Stack</div>
                {/*!! Map all stacks !!*/}
              </div>
              <div className="detail-content">
                <div className="detail-subtitle">Description</div>
                <div>{Parser(`${project.content}`)}</div>
              </div>
            </div>

            <div className="deatil-about__right">
              <div className="detail-meta">
                <div className="detail-submeta submeta__created">
                  <div className="detail-subtitle">Posted On</div>
                  <div className="detail-createdDate">{project.createdAt}</div>
                </div>
                <div className="detail-submeta submeta__roles">
                  <div className="detail-subtitle">Role Openings</div>
                  {project?.roles?.map((role) => {
                    return role.role;
                  })}
                </div>
                <div className="detail-submeta submeta__period">
                  {project?.startDate ? (
                    <div>{project.startDate}</div>
                  ) : (
                    <div>Not specifed</div>
                  )}
                  {project?.endDate ? (
                    <div>{project.endDate}</div>
                  ) : (
                    <div>Not specifed</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
