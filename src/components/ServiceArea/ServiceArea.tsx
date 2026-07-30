import "./ServiceArea.css";

const locations = [
  "Glyndon",
  "Reisterstown",
  "Owings Mills",
  "Randallstown",
  "Pikesville",
  "Hunt Valley",
  "Towson",
  "Westminster",
];

const ServiceArea = () => {
  return (
    <section id="service-area" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Service Area</p>
          <h2>Serving pets throughout northern Baltimore County and beyond.</h2>
        </div>

        <div className="location-list">
          {locations.map((location) => (
            <span key={location} className="location-pill">
              {location}
            </span>
          ))}
        </div>

        <p className="service-area-note">
          Also serving surrounding communities in Baltimore and Carroll
          Counties.
        </p>
      </div>
    </section>
  );
};

export default ServiceArea;