import "./_sidebar.scss";
import techStacksJson from "../../data/techstacks.json";
import { v4 as uuidV4 } from "uuid";
import useFilterContext from "../../hooks/useFilterContext";
import { SET_PAGENUMBER, SET_TAGS } from "../../constants/actionTypes";

const Sidebar = ({ techStackTags, setTechStacks, setPageNumber }) => {
  const techTags = techStacksJson.teachstacks;
  const { tags, dispatch } = useFilterContext();

  const handleTagClick = (e) => {
    dispatch({ type: SET_PAGENUMBER, payload: 1 });
    const selectedTag = e.target.getAttribute("data-tag");
    const wasTagSelected = tags?.includes(selectedTag);
    let tagsToUpdate;

    if (!tags) return dispatch({ type: SET_TAGS, payload: [selectedTag] });

    if (wasTagSelected) {
      tagsToUpdate = tags.filter((tag) => tag !== selectedTag);

      tagsToUpdate.length === 0
        ? dispatch({ type: SET_TAGS, payload: null })
        : dispatch({ type: SET_TAGS, payload: tagsToUpdate });
    } else {
      tagsToUpdate = [...tags, selectedTag];
      e.target.classList.add("selected");
      dispatch({ type: SET_TAGS, payload: tagsToUpdate });
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
              data-selected={tags?.includes(tag) ? "true" : "false"}
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
