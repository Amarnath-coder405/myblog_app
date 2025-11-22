import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
  return (
    // Footer wrapper with dark background and white text
    <footer className="footer bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section: Brief description about company */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Amarnath IT Solutions Pvt. Ltd.</h5>
            {/* Muted text for less emphasis but readable on dark background */}
            <p className="text-muted small">
              Building scalable, modern, and impactful digital experiences across platforms.
            </p>
          </div>

          {/* Quick Links: Navigation shortcuts */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section: Email, phone and social media links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Contact</h5>
            {/* Using text-muted for less emphasis but still readable */}
            <p className="text-muted small mb-1">Email: support@example.com</p>
            <p className="text-muted small mb-3">Phone: +91 1234567893</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Copyright info centered */}
        <div className="row mt-4">
          <div className="col text-center">
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Amarnath IT Solutions Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
