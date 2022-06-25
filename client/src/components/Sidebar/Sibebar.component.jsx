import "./_sidebar.scss";
import techStacksJson from "../../assets/techstacks.json";
import { v4 as uuidV4 } from "uuid";

const Sidebar = ({ techStackTags, setTechStacks }) => {
  const techTags = techStacksJson.teachstacks;

  return (
    <div className="tags-wrapper">
      <div className="tags-header">Tech Stack</div>
      <ul className="tag-list">
        {techTags.map((tag) => {
          return (
            <li
              key={uuidV4()}
              className="tag-button"
              data-tag={tag}
              data-selected="false"
            >
              #{tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
