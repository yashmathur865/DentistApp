import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ clinicName = "SmileCare" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Doctor', path: '/doctor' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🦷</span>
          <span className="logo-text">{clinicName}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="admin-nav-actions">
              <Link to="/admin/dashboard" className="btn btn-outline btn-sm d-none-sm">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-primary btn-sm">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/book" className="btn btn-primary d-none-sm">
                Book Appointment
              </Link>
              <a href="tel:+912223456789" className="nav-phone d-none-md">
                <Phone size={18} />
                <span>+91 22-2345-6789</span>
              </a>
            </>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle d-block-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="mobile-admin-actions">
              <Link to="/admin/dashboard" className="mobile-nav-link">
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-primary w-full">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/book" className="btn btn-primary mobile-book-btn">
              Book Appointment
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
