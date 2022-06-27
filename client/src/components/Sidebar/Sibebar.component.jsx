import "./_sidebar.scss";
import techStacksJson from "../../assets/techstacks.json";
import { v4 as uuidV4 } from "uuid";

const Sidebar = ({ techStackTags, setTechStacks }) => {
  const techTags = techStacksJson.teachstacks;

  const handleTagClick = (e) => {
    const selectedTag = e.target.getAttribute("data-tag");
    const wasTagSelected = techStackTags?.includes(selectedTag);
    let tagsToUpdate;

    if (!techStackTags) return setTechStacks([selectedTag]);

    if (wasTagSelected) {
      tagsToUpdate = techStackTags.filter((tag) => tag !== selectedTag);

      tagsToUpdate.length === 0
        ? setTechStacks(null)
        : setTechStacks(tagsToUpdate);
    } else {
      tagsToUpdate = [...techStackTags, selectedTag];
      e.target.classList.add("selected");
      setTechStacks(tagsToUpdate);
    }
  };

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
              data-selected={techStackTags?.includes(tag) ? "true" : "false"}
              onClick={handleTagClick}
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
