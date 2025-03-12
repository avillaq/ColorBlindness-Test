import { Carousel } from "flowbite-react";
import { Card, CardBody } from "@heroui/card";

export const CarouselTest = ({ carouselItems }) => {
  return (
    <div className="h-[660px] md:h-[550px] lg:h[440px] xl:h-[490px]">
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
                  <div className="flex flex-col w-full max-w-80 gap-2 lg:w-5/12 lg:max-w-full">
                    {item.visual}
                    <small className="italic text-center">(Simulation - Results may vary)</small>
                  </div>
                  <div className="lg:w-7/12 lg:pt-2">
                    <h3>{item.title}</h3>
                    {item.description}
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
