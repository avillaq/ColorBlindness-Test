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
              <Link color="foreground" href="/faq">FAQ</Link>
              <Link color="foreground" href="/about">About Us</Link>
            </div>
          </div>
          <div className="footer-links">
            <h3>Popular</h3>
            <div>
              <Link color="foreground" href="/tests/ishihara-test">Ishihara Test</Link>
              <Link color="foreground" href="/tests/farnsworth-d-15-test">Farnsworth D15 Test</Link>
              <Link color="foreground" href="/tests/anomaloscope-test">Anomaloscope Test</Link>
              <Link color="foreground" href="/tests/farnsworth-lantern-test">Farnsworth Lantern Test</Link>
              <Link color="foreground" href="/tests/cambridge-test">Cambridge Test</Link>
            </div>
          </div>
          <div className="footer-links">
            <h3>Legal</h3>
            <div>
              <Link color="foreground" href="/disclaimer">Disclaimer</Link>
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