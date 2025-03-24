import { Image } from "@heroui/image"
import { Card, CardBody } from "@heroui/card"
import "../styles/pages/About.css"
import aboutUsImage from "../assets/aboutus-image.webp"

export const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="content-text">
          <h2>About us</h2>
          <p>Welcome to ColorVision! We provide a comprehensive range of scientifically validated color vision tests that are easy to use and deliver precise results. Our mission is to help you understand your color vision, whether you are concerned about color blindness or simply wish to monitor your vision health.</p>
        </div>
        <Image src={aboutUsImage} />
      </div>
      <div className="about-content">
        <Card className="sm:w-[420px] sm:h-[380px]"> 
          <CardBody>
            <div className="flex flex-col gap-4 p-1 sm:p-4">
              <h3>Our Story</h3>
              <p>
                ColorVision was developed to make professional color vision testing accessible to everyone. We offer scientifically validated tests including the Ishihara Test, Farnsworth D15, Cambridge Color Test, Farnsworth Lantern Test and Anomaloscope Test.<br />
                Our platform is designed for both individuals concerned about their color vision and professionals who require regular testing for their work.
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="sm:w-[420px] sm:h-[380px]"> 
          <CardBody>
            <div className="flex flex-col gap-4 p-1 sm:p-4">
              <h3>Our Mission</h3>
              <p>
                Our mission is to provide reliable color vision testing that's both accessible and scientifically accurate. We focus on empowering users with detailed insights about their color vision capabilities, whether for professional requirements or personal health monitoring. <br />
                Through early detection and regular assessment, we help users maintain their quality of life and meet their professional standards.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}