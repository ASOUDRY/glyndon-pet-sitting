import "./Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>© {currentYear} Glyndon Pet Services</p>

        <p>Serving Baltimore & Carroll Counties, Maryland</p>
      </div>
    </footer>
  );
};

export default Footer;