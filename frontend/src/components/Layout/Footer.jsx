import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import {
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaUserTie,
  FaBlog
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer-container ${isAuthorized ? 'footerShow' : 'footerHide'}`}>
      <div className="footer-content">
        <div className="footer-section brand-section">
          
          <h3>Skill-Match</h3>
          {/* <p className="footer-description">
            Connecting talented professionals with their dream careers. Find your next opportunity
            or hire the perfect candidate with our comprehensive job portal platform.
          </p> */}
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                <FaBriefcase className="footer-icon" />
                <span>Browse Jobs</span>
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                <FaBlog className="footer-icon" />
                <span>Career Blog</span>
              </Link>
            </li>
            <li>
              <Link to="/my-applications" className="footer-link">
                <FaUserTie className="footer-icon" />
                <span>My Applications</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/my-jobs" className="footer-link">
                <FaBriefcase className="footer-icon" />
                <span>Post a Job</span>
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="footer-section social-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a 
              href="https://github.com/RitikLahari"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://leetcode.com/u/ritik_lahari01/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LeetCode"
            >
              <SiLeetcode />
            </a>
            <a 
              href="https://in.linkedin.com/in/ritik-lahari-267213254"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>&copy; {currentYear} Skill-Match. All rights reserved.</p>
        </div>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;