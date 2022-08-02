import "./_footer.scss";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === "/success") return null;

  return (
    <footer className="container" id="footer" data-section="footer">
      <div className="content-wrapper" data-section="footer">
        <p>&copy; Joinnerry</p>
        <p>FAQ</p>
        <p>Terms</p>
        <p>Privacy</p>
      </div>
    </footer>
  );
};

export default Footer;
