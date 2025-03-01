import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
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
        unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.
      </section>

      <br></br>
      . Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus unde labore amet cupiditate ratione explicabo quae a voluptates dignissimos excepturi repudiandae placeat quod, facilis veniam? Accusantium, aperiam molestiae.. Quasi at atque facere tempora rerum officia corrupti expedita. Quaerat porro veritatis odit, recusandae atque repellat obcaecati accusamus
    </div>
  )
}
