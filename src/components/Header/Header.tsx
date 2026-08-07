import "./Header.css";
const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a href="#home" className="logo">
          Glyndon Pet Services
        </a>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#service-area">Service Area</a>
          <a href="#availability-section">Availability</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;