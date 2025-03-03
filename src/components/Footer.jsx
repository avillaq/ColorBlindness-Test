import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { ColorBlindnessLogo } from "./NavBar";
import "../styles/components/Footer.css";

export const Footer = () => {
  return (
    <>
      <Divider />
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-content">
              <ColorBlindnessLogo />
              <h2>ColorVision</h2>
            </div>
            <p>Professional color blindness testing with accurate results and educational resources.</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <div>
              <Link color="foreground" href="/">Home</Link>
              <Link color="foreground" href="/tests">Take Test</Link>
              <Link color="foreground" href="/education">Education</Link>
              <Link color="foreground" href="/about">About Us</Link>
            </div>
          </div>
          <div className="footer-links">
            <h3>Resources</h3>
            <div>
              <Link color="foreground" href="/education">Articles</Link>
              <Link color="foreground" href="/education">Video Tuhrefrials</Link>
              <Link color="foreground" href="/education">FAQ</Link>
              <Link color="foreground" href="/education">Research</Link>
            </div>
          </div>
          <div className="footer-links">
            <h3>Legal</h3>
            <div>
              <Link color="foreground" href="/privacy">Privacy Policy</Link>
              <Link color="foreground" href="/terms">Terms of Service</Link>
              <Link color="foreground" href="/disclaimer">Accessibility Statement</Link>
              <Link color="foreground" href="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
        <Divider />
        <div className="footer-credits">
          <p>&copy; 2025 ColorVision. All rights reserved.</p>
          <p>Designed and developed by <Link color="foreground" href="https://github.com/avillaq">AlexanderVQ</Link></p>
        </div>

      </div>
    </>

  );
};