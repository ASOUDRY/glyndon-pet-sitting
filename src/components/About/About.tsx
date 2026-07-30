import "./About.css";
import casey from "../../assets/carousel/Casey.webp";

const About = () => {
  return (
    <section id="about" className="section section-alt">
      <div className="container about-grid">
        <div className="about-image-wrapper">
          <img
            className="about-image"
            src={casey}
            alt="Glyndon Pet Services with a dog"
          />
        </div>

        <div className="about-content">
          <p className="eyebrow">About Glyndon Pet Services</p>

          <h2>Personal care from someone who genuinely enjoys animals.</h2>

          <p>
            I’ve been caring for pets for nearly 20 years and understand that
            every animal has its own personality, routine, and comfort level.
          </p>

          <p>
            I follow your instructions closely and give your pets the kind of
            attention they’re used to, whether that means long walks, playtime,
            quiet companionship, or simply keeping their normal schedule intact.
          </p>

          <p>
            You’ll also receive regular photo updates so you know how your pets
            are doing while you’re away.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;