import { SET_CATEGORY, SET_PAGENUMBER } from "../../constants/actionTypes";
import useFilterContext from "../../hooks/useFilterContext";
import "./_categoryMenu.scss";

const CategoryMenu = () => {
  const { category, dispatch } = useFilterContext();

  const handleCategoryClick = (e) => {
    dispatch({ type: SET_PAGENUMBER, payload: 1 });

    const selectedCategory = e.target.dataset.category;
    dispatch({ type: SET_CATEGORY, payload: selectedCategory });
  };

  return (
    <div className="category-wrapper">
      <ul className="category-list" onClick={handleCategoryClick}>
        <li
          className={`category-item ${category === "latest" ? "active" : ""}`}
          data-category="latest"
        >
          Latest
        </li>
        <li
          className={`category-item ${
            category === "web application" ? "active" : ""
          }`}
          data-category="web application"
        >
          Web App
        </li>
        <li
          className={`category-item ${
            category === "mobile application" ? "active" : ""
          }`}
          data-category="mobile application"
        >
          Mobile App
        </li>
        <li
          className={`category-item ${
            category === "game development" ? "active" : ""
          }`}
          data-category="game development"
        >
          Game Dev
        </li>
        <li
          className={`category-item ${
            category === "website development" ? "active" : ""
          }`}
          data-category="website development"
        >
          Website Dev
        </li>
        <li
          className={`category-item ${category === "others" ? "active" : ""}`}
          data-category="others"
        >
          Others
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
