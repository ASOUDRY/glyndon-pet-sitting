import "./Contact.css";
const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-content">
        <div>
          <p className="eyebrow">Get Started</p>
          <h2>Need someone to care for your pets?</h2>

          <p>
            Tell me a little about your pets, the care you need, and the dates
            you have in mind.
          </p>
        </div>

        <form className="contact-form">
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Phone
            <input type="tel" name="phone" placeholder="Your phone number" />
          </label>

          <label>
            How can I help?
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your pets, dates, and the service you need."
              required
            />
          </label>

          <button type="submit" className="button button-primary">
            Send Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;