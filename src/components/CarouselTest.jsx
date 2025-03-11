import { useState } from "react";
import Carousel from "react-simply-carousel";
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
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="carousel-container">
      <Carousel
        containerProps={{
          style: {
            width: "100%",
            userSelect: "none",
          },
        }}
        itemsListProps={{
          style: {
            padding: "0",
          },
        }}
        preventScrollOnSwipe
        swipeTreshold={60}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        dotsNav={{
          show: true,
          itemBtnProps: {
            style: {
              height: 10,
              width: 10,
              borderRadius: "50%",
              border: 0,
              marginLeft: 4,
              marginRight: 4,
              marginTop: 8,
              backgroundColor: "#E2E8F0"
            },
          },
          activeItemBtnProps: {
            style: {
              height: 10,
              width: 10,
              borderRadius: "50%",
              border: 0,
              background: "#0066cc",
              marginLeft: 4,
              marginRight: 4,
              marginTop: 8,
            },
          },
        }}
        itemsToShow={1}
        speed={400}
        centerMode
        forwardBtnProps={{
          children: <box-icon name="right-arrow-circle" type="solid" color="#0066cc" size="md"></box-icon>,
        }}
        backwardBtnProps={{
          children: <box-icon name="left-arrow-circle" type="solid" color="#0066cc" size="md"></box-icon>,
        }}
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ backgroundColor: item.color}}
          >
            <div className="carousel-visual">
              <img src={item.visual} alt={item.title} />
            </div>
            <div className="carousel-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
