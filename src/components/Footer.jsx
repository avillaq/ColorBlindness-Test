import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { ColorBlindnessLogo } from "./NavBar";
import "../styles/components/Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <ColorBlindnessLogo />
          <p className="text-logo">ColorVision</p>
          <p className="brand-description">Professional color blindness testing and education platform.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Tests</h4>
            <Link href="#">Ishihara Test</Link>
            <Link href="#">Farnsworth D-15</Link>
            <Link href="#">Cambridge Test</Link>
            <Link href="#">Kids Test</Link>
          </div>
          
          <div className="link-group">
            <h4>Resources</h4>
            <Link href="#">Education</Link>
            <Link href="#">About Color Blindness</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Blog</Link>
          </div>
          
          <div className="link-group">
            <h4>Company</h4>
            <Link href="#">About Us</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <Divider className="footer-divider" />
      
      <div className="footer-bottom">
        <p>&copy; 2024 ColorVision. All rights reserved.</p>
        <div className="social-links">
          <Link href="#" aria-label="Twitter">
            <box-icon type='logo' name='twitter'></box-icon>
          </Link>
          <Link href="#" aria-label="Facebook">
            <box-icon type='logo' name='facebook'></box-icon>
          </Link>
          <Link href="#" aria-label="Instagram">
            <box-icon type='logo' name='instagram'></box-icon>
          </Link>
        </div>
      </div>
    </div>
  );
};