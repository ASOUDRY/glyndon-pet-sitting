import "./Services.css";
const services = [
  {
    title: "Dog Walking",
    description:
      "Dependable walks tailored to your dog's pace, routine, and energy level.",
  },
  {
    title: "Drop-In Visits",
    description:
      "In-home visits for feeding, playtime, bathroom breaks, and companionship.",
  },
  {
    title: "Pet Boarding",
    description:
      "I will host your pets treating them like they are my own.",
  },
  {
    title: "Overnight Pet Sitting",
    description:
      "Overnight care that helps your pets stay comfortable in their normal routine.",
  },
  {
    title: "Pet Transportation",
    description:
      "Safe transportation to veterinary appointments, grooming visits, and other local destinations.",
  },
  {
    title: "Other Animal Care",
    description:
      "Safe transportation to veterinary appointments, grooming visits, and other local destinations.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Pet care built around your routine.</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;