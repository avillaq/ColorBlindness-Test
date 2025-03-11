import { Carousel } from "flowbite-react";
import { Card, CardBody } from "@heroui/card";
import "../styles/components/CarouselTest.css";

const carouselItems = [
  {
    title: "Protanopia",
    description: "Red-green color blindness with reduced sensitivity to red light. People with protanopia have difficulty distinguishing between red and green colors, and also between colors with red or green components.",
    visual: "/src/assets/ishihara-plates/plate11.webp",
    color: "#FFF5F5"
  },
  {
    title: "Deuteranopia",
    description: "Red-green color blindness with reduced sensitivity to green light. Similar to protanopia, but caused by the absence of green-sensitive retinal cones. This affects how greens, reds, and their combinations are perceived.",
    visual: "/src/assets/ishihara-plates/plate11.webp",
    color: "#F0FFF4"
  },
  {
    title: "Normal Vision",
    description: "Standard color vision with full spectrum perception. People with normal color vision can distinguish between millions of different hues and saturation levels across the visible spectrum.",
    visual: "/src/assets/ishihara-plates/plate11.webp",
    color: "#F0F9FF"
  }
];

export const CarouselTest = () => {

  return (
    <div className="h-60 sm:h-64 xl:h-80 2xl:h-[440px]">
      <Carousel
        leftControl={<box-icon name="left-arrow-circle" type="solid" color="#0066cc" size="md"></box-icon>}
        rightControl={<box-icon name="right-arrow-circle" type="solid" color="#0066cc" size="md"></box-icon>}
        indicators={false}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="flex items-center justify-center h-full">
            <Card className="mx-10 w-full">
              <CardBody>
                <h4>Technical Details</h4>
                <div className="technical-details">
                  <div>
                    <p>Basic Plates Correct (1-11):</p>
                  </div>
                  <div>
                    <p>Protan Indicators:</p>
                  </div>
                  <div>
                    <p>Deutan Indicators:</p>
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
