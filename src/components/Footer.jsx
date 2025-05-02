import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>A passionate Web Developer building awesome websites.</p>
        </div>
        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: adsukhwal2000@gmail.com</p>
          <p>
            <a href="tel:+916350266408" style={{ color: "white" }}>
              6350266408
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} adWebPages. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
