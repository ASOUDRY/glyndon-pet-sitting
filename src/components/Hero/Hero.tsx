import "./Hero.css";
const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <p className="eyebrow">Local Pet Care You Can Count On</p>

        <h1>Reliable care for your pets when you can’t be there.</h1>

        <p className="hero-text">
          Dog walking, drop-in visits, overnight stays, and pet transportation
          throughout Glyndon, Reisterstown, Owings Mills, and surrounding areas.
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="button button-primary">
            Request a Visit
          </a>

          <a href="#services" className="button button-secondary">
            View Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;