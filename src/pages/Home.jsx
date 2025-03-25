import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { useNavigate } from 'react-router-dom';
import "../styles/pages/Home.css";
import heroImage from "../assets/hero-image.webp"
import anomaloscopeImage from "../assets/anomaloscope-test.webp"
import cambridgeImage from "../assets/cambridge-test.webp"
import farnsworthD15Image from "../assets/farnsworth-d15-test.webp"
import farnsworthLanternImage from "../assets/farnsworth-lantern-test.webp"
import ishiharaImage from "../assets/ishihara-test.webp"

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Professional Color Blindness Testing</h1>
            <p>Accurate, accessible, and educational color vision testing for everyone. Understand your color perception with our medically-informed tests.</p>
          </div>
          <div className="hero-cta">
            <Button color="primary" onPress={() => navigate("/tests")}>Start Your Test</Button>
            <Button color="primary" variant="ghost" onPress={() => navigate("/faq")}>
              Learn More
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <Image
            alt="Colorblindness Test Hero Image"
            src={heroImage}
            width={650}
          />
        </div>
      </section>
      
      <section className="content-section">
        <div className="content-text">
          <h2>Comprehensive Color Vision Testing</h2>
          <p>Our tests are designed by medical professionals to provide accurate assessments of various types of color vision deficiencies.</p>
        </div>
        <div className="content-tests">
          <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex flex-col gap-3">
              <Image
                alt="Ishihara Test logo"
                height={80}
                radius="full"
                src={ishiharaImage}
                width={80}
              />
              <h3>Ishihara Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>The most widely used screening test. Identifies red-green color vision deficiencies using numbered plates with colored dots.</p>
            </CardBody>
          </Card>
          <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex flex-col gap-3">
              <Image
                alt="Farnsworth d-15 logo"
                height={80}
                radius="full"
                src={farnsworthD15Image}
                width={80}
              />
              <h3>Farnsworth D-15</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Diagnostic test where patients arrange 15 colored caps in order, revealing specific types of color vision deficiencies.</p>
            </CardBody>
          </Card>

          <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex flex-col gap-3">
              <Image
                alt="Cambridge Test logo"
                height={80}
                radius="full"
                src={cambridgeImage}
                width={80}
              />
              <h3>Cambridge Colour Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Digital test using C-shaped patterns. Patient identifies the gap location to assess color discrimination ability.</p>
            </CardBody>
          </Card>

          <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex flex-col gap-3">
              <Image
                alt="Anomaloscope Test logo"
                height={80}
                radius="full"
                src={anomaloscopeImage}
                width={80}
              />
              <h3>Anomaloscope Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Precise diagnostic device measuring exact color vision deficiency type through red-green color matching.</p>
            </CardBody>
          </Card>

          <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex flex-col gap-3">
              <Image
                alt="Farnsworth Lantern logo"
                height={80}
                radius="full"
                src={farnsworthLanternImage}
                width={80}
              />
              <h3>Farnsworth Lantern Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Practical test using colored lights, crucial for aviation and maritime certification.</p>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="how-it-works-text">
          <h2>How It Works</h2>
          <p>Our testing process is simple, accurate, and designed with accessibility in mind.</p>
        </div>
        <div className="how-it-works-steps">
          <Card className="step-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex gap-3">
              <Chip radius="full" color="primary" classNames={{ base: "min-w-12 min-h-12 text-xl" }}>1</Chip>
              <h3>Take the Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Complete our interactive color vision tests with clear instructions at each step.</p>
            </CardBody>
          </Card>
          <Card className="step-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex gap-3">
              <Chip radius="full" color="primary" classNames={{ base: "min-w-12 min-h-12 text-xl" }}>2</Chip>
              <h3>Get Results</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Receive immediate results with a detailed analysis of your color vision capabilities.</p>
            </CardBody>
          </Card>
          <Card className="step-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
            <CardHeader className="flex gap-3">
              <Chip radius="full" color="primary" classNames={{ base: "min-w-12 min-h-12 text-xl" }}>3</Chip>
              <h3>Learn & Share</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Access educational resources and share your results with healthcare professionals.</p>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-text">
          <h2>Ready to Test Your Color Vision?</h2>
          <p>Our comprehensive tests take just a few minutes and provide valuable insights into your color perception.</p>
        </div>
        <div className="cta-button">
          <Button color="primary" onPress={() => navigate("/tests")}>Start Your Test Now</Button>
        </div>
      </section>

    </div>
  )
}
