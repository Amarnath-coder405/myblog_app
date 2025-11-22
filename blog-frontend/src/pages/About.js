import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import test_image from '../assets/profilepic.png';
import dummy_image from '../assets/dummy.jpg';

const teamMembers = [
  {
    name: 'Jake',
    role: 'Founder & CEO',
    image: test_image,
    bio: 'Visionary leader with a passion for innovation.',
  },
  {
    name: 'Smith',
    role: 'CTO',
    image: test_image,
    bio: 'Tech guru who ensures our systems scale seamlessly.',
  },
  {
    name: 'Johnson',
    role: 'Lead Designer',
    image: test_image,
    bio: 'Creates elegant and user-centric designs.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">About Us</h1>
          <p className="lead text-muted">
            We are a passionate team dedicated to building modern, scalable, and elegant digital solutions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={dummy_image}
              alt="Our Mission"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-semibold">Our Mission</h2>
            <p className="text-muted">
              Our mission is to empower businesses and individuals through accessible and cutting-edge technology.
              We focus on creating seamless user experiences and robust back-end systems.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-5">Meet the Team</h2>
          <div className="row justify-content-center">
            {teamMembers.map((member, idx) => (
              <div className="col-sm-10 col-md-6 col-lg-4 mb-4" key={idx}>
                <div className="card border-0 shadow-sm h-100 text-center p-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle mx-auto d-block mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{member.name}</h5>
                    <p className="text-primary mb-1">{member.role}</p>
                    <p className="text-muted small">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-5 text-center">
        <h3 className="mb-3">Want to work with us?</h3>
        <p className="text-muted mb-4">We'd love to hear from you.</p>
        <a href="/contact" className="btn btn-primary px-4 py-2">Contact Us</a>
      </section>
    </div>
  );
}
