import { useState } from "react";
import "./Contact.css";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const formIsComplete =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.message.trim() !== "";

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formIsComplete) {
      return;
    }

    setSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://glyndon-pet-services-509591974394.us-east1.run.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      setSuccessMessage(
        "Your request has been sent. I'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Failed to send contact request:",
        error
      );

      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="section contact-section"
    >
      <div className="container contact-content">
        <div className="contact-intro">
          <p className="eyebrow">Get Started</p>

          <h2>Need someone to care for your pets?</h2>

          <p>
            Tell me a little about your pets, the care
            you need, and the dates you have in mind.
          </p>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <label>
            Name

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone

            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            How can I help?

            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your pets, dates, and the service you need."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button
            type="submit"
            className="button button-primary"
            disabled={!formIsComplete || sending}
          >
            {sending ? "Sending..." : "Send Request"}
          </button>

          {successMessage && (
            <p className="contact-success">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="contact-error">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;