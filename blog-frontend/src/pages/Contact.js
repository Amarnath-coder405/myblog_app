import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="container py-5 px-3 px-md-5" id="contact">
      <div className="row g-5">
        {/* About Us Info Panel */}
        <div className="col-lg-5">
          <h1 className="display-4 fw-bold mb-3">Who We Are</h1>
          <p className="text-muted">
            We are a passionate team dedicated to building modern, scalable, and elegant digital solutions.
          </p>
          <p className="text-muted">
            Our mission is to empower businesses and individuals through accessible and cutting-edge technology.
            We focus on creating seamless user experiences and robust back-end systems.
          </p>
          <ul className="list-unstyled mt-4 small">
            <li className="mb-2">
              <strong>Email:</strong> contact@example.com
            </li>
            <li className="mb-2">
              <strong>Phone:</strong> +91 1234567893
            </li>
            <li className="mb-2">
              <strong>Address:</strong> Hyderabad
            </li>
          </ul>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary mt-3"
          >
            View on Map
          </a>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="display-4 fw-bold mb-3">Let’s Collaborate</h1>
              <p className="text-muted mb-4">
                Whether you have a project in mind or simply want to learn more about what we do, reach out — we’d love to hear from you.
              </p>

              {submitted && (
                <div className="alert alert-success" role="alert" aria-live="polite">
                  ✅ Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-control"
                    placeholder="Write your message here..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
