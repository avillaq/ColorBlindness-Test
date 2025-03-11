import { useState } from "react";
import Carousel from "react-simply-carousel";
import "../styles/components/CarouselTest.css";

const carouselItems = [
  {
    title: "Protanopia",
    description: "Red-green color blindness with reduced sensitivity to red light",
    color: "#FFF5F5"
  },
  {
    title: "Deuteranopia",
    description: "Red-green color blindness with reduced sensitivity to green light",
    color: "#F0FFF4"
  },
  {
    title: "Normal Vision",
    description: "Standard color vision with full spectrum perception",
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
            justifyContent: "space-between",
            userSelect: "none"
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
            style={{
              background: item.color,
              height: 300,
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "24px",
              margin: "0 16px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexGrow: 1,
              width: "100%"
            }}
          >
            <h3 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: "16px"
            }}>
              {item.title}
            </h3>
            <p style={{
              fontSize: "16px",
              color: "#64748B",
              lineHeight: "1.5"
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
