import "./_footer.scss";
import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === "/success") return null;

  return (
    <footer className="container" id="footer" data-section="footer">
      <div className="content-wrapper" data-section="footer">
        <Link className="footer-link" to="/">
          &copy; Joinnerry
        </Link>
        <Link className="footer-link" to="/faq">
          FAQ
        </Link>
        <Link className="footer-link" to="/terms">
          Terms
        </Link>
        <Link className="footer-link" to="/privacy">
          Privacy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
