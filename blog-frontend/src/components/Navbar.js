import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';
import './Navbar.css'; // Custom styles including responsive fixes

export default function Navbar() {
  const navigate = useNavigate();

  // Check if user is admin by reading from localStorage
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // State for showing/hiding profile dropdown menu
  const [showProfile, setShowProfile] = useState(false);

  // Dummy notifications count - can be replaced with real data
  const [notifications, setNotifications] = useState(2);

  // Ref for profile dropdown to handle outside clicks
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Logout handler clears admin status and navigates home
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Toggle visibility of profile dropdown menu
  const toggleProfileDropdown = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm custom-navbar">
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/myblog">
          <span className="brand-highlight">My</span>Blog
        </Link>

        {/* Mobile toggle button for collapsing menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links and icons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation links */}
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <NavLink to="/myblog" className="nav-link" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin" className="nav-link">
                Dashboard
              </NavLink>
            </li>
          </ul>

          {/* Icons: Notifications and Profile */}
          <div className="d-flex align-items-center gap-3">
            {/* Notification bell with badge */}
            <div className="position-relative" aria-label="Notifications">
              <FaBell className="fs-5 bell-icon" />
              {notifications > 0 && (
                <span className="notification-badge" aria-live="polite">
                  {notifications}
                </span>
              )}
            </div>

            {/* Profile dropdown */}
            <div
              ref={profileRef}
              className="profile-dropdown position-relative"
            >
              <div
                className="profile-icon d-flex align-items-center"
                onClick={toggleProfileDropdown}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleProfileDropdown();
                }}
                aria-haspopup="true"
                aria-expanded={showProfile}
                aria-label="User profile menu"
              >
                <FaUserCircle className="fs-4 profile-icon-svg" />
              </div>

              {/* Dropdown menu content */}
              {showProfile && (
                <div
                  className="dropdown-card animate__animated animate__fadeIn"
                  role="menu"
                  aria-label="Profile options"
                >
                  <div className="text-center">
                    <FaUserCircle className="fs-1 text-secondary mb-2" />
                    <h6 className="mb-0">Admin User</h6>
                    <small className="text-muted">admin@example.com</small>
                  </div>
                  <hr />
                  {isAdmin && (
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
