// NewsletterSignup.jsx
import React, { useState } from "react";
import "./NewsletterSignup.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success or error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Simulate API call or integration
    setStatus("Thank you for subscribing!");
    setEmail("");

    // TODO: Replace with real API call to Mailchimp, SendGrid, etc.
    // fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
  };

  return (
    <div className="newsletter-container">
      <h3>Subscribe to Our Newsletter</h3>
      <p>Get the latest blog updates directly to your inbox.</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default NewsletterSignup;
