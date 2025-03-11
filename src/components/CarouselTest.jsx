import { Carousel } from "flowbite-react";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import "../styles/components/CarouselTest.css";
import ishiharaTestOriginalPlate from "../assets/ishihara-test-original.webp";

const carouselItems = [
  {
    title: "Red-Green Color Blindness",
    description: "The Ishihara Test is specifically designed to identify red-green color blindness, which is the most common form of color vision deficiency. This condition affects the ability to distinguish between shades of red and green and is caused by abnormalities in the cone cells of the retina that detect these colors.",
    visual: "/src/assets/ishihara-plates/plate11.webp",
    color: "#FFF5F5"
  },
  {
    title: "Deuteranopia",
    description: "Deuteranopia is a type of red-green color blindness in which the green-sensitive cones in the eye are missing or non-functional. People with this condition often confuse greens with reds and may struggle to differentiate between certain shades of yellow and brown.",
    visual: "/src/assets/ishihara-plates/plate11.webp",
    color: "#F0FFF4"
  },
  {
    title: "Protanopia",
    description: "Protanopia occurs when the red-sensitive cones are absent or defective. Those with this condition have difficulty distinguishing reds from greens and may perceive reds as much darker than they actually are.",
    visual: "/src/assets/ishihara-plates/plate11.webp",
    color: "#F0F9FF"
  }
];

export const CarouselTest = () => {

  return (
    <div className="h-[660px] md:h-[550px] lg:h[440] xl:h-[400px]">
      <Carousel
        leftControl={<box-icon name="left-arrow-circle" type="solid" color="#0066cc" size="md"></box-icon>}
        rightControl={<box-icon name="right-arrow-circle" type="solid" color="#0066cc" size="md"></box-icon>}
        indicators={false}
        draggable={false}
        slide={false}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-full">
            <Card className="mx-9 w-full h-modal">
              <CardBody>
                <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start lg:p-3">
                  <div className="flex flex-col gap-2 lg:w-5/12">
                    <Image
                      src={ishiharaTestOriginalPlate}
                      alt="Ishihara test original plate"
                    />
                    <small className="italic text-center">(Simulation - Results may vary)</small>
                  </div>
                  <div className="lg:w-7/12 lg:pt-2">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
