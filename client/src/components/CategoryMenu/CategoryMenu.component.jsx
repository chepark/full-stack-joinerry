import "./_categoryMenu.scss";

const CategoryMenu = () => {
  return (
    <div className="category-wrapper">
      <ul className="category-list">
        <li className="category-item" data-category="latest">
          Latest
        </li>
        <li className="category-item" data-category="web application">
          Web App
        </li>
        <li className="category-item" data-category="mobile application">
          Mobile App
        </li>
        <li className="category-item" data-category="game development">
          Game Dev
        </li>
        <li className="category-item" data-category="web development">
          Website Dev
        </li>
        <li className="category-item" data-category="others">
          Others
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
