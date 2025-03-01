import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import "../styles/pages/Home.css";
import heroImage from "../assets/hero-image.webp"

export const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Professional Color Blindness Testing</h1>
            <p>Accurate, accessible, and educational color vision testing for everyone. Understand your color perception with our medically-informed tests.</p>
          </div>
          <div className="hero-cta">
            <Button color="primary">Start Your Test</Button>
            <Button color="primary" variant="ghost">
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
          <Card className="test-card">
            <CardHeader className="flex gap-3">
              <Image
                alt="Ishihara Test logo"
                height={30}
                radius="full"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={30}
              />
              <h3>Ishihara Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>The standard test for red-green color deficiencies using specially designed plates.</p>
            </CardBody>
          </Card>
          <Card className="test-card">
            <CardHeader className="flex gap-3">
              <Image
                alt="Farnsworth d-15 logo"
                height={30}
                radius="full"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={30}
              />
              <h3>Farnsworth D-15</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Evaluates your ability to arrange colors in the correct hue order.</p>
            </CardBody>
          </Card>
          <Card className="test-card">
            <CardHeader className="flex gap-3">
              <Image
                alt="Cambridge Colour Test logo"
                height={30}
                radius="full"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={30}
              />
              <h3>Cambridge Colour Test</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Advanced computerized test for precise diagnosis of color vision anomalies.</p>
            </CardBody>
          </Card>
        </div>
      </section>
      <section className="how-it-works-section">

      </section>

      . Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus
    </div>
  )
}
