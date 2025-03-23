import { Card, CardBody } from "@heroui/card"
import "../styles/pages/FAQ.css"

export const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="faq-hero">
        <div className="content-text">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <p>Find answers to common questions faq our color vision tests. Get support and insights for your inquiries.</p>
        </div>
      </div>
      <div className="faq-content">
        <Card className="sm:w-[420px] sm:h-[380px]"> 
          <CardBody>
            <div className="flex flex-col gap-4 p-4">
              <h3>Our Story</h3>
              <p>
                ColorVision was developed to make professional color vision testing accessible to everyone. We offer scientifically validated tests including the Ishihara Test, Farnsworth D15, Cambridge Color Test, Farnsworth Lantern Test and Anomaloscope Test.<br />
                Our platform is designed for both individuals concerned faq their color vision and professionals who require regular testing for their work.
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="sm:w-[420px] sm:h-[380px]"> 
          <CardBody>
            <div className="flex flex-col gap-4 p-4">
              <h3>Our Mission</h3>
              <p>
                Our mission is to provide reliable color vision testing that's both accessible and scientifically accurate. We focus on empowering users with detailed insights faq their color vision capabilities, whether for professional requirements or personal health monitoring. <br />
                Through early detection and regular assessment, we help users maintain their quality of life and meet their professional standards.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}