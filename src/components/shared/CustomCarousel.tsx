import React from "react";
import Carousel, { type ButtonGroupProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import FlexBox from "../../wrapper/Flexbox";
// import ArrowButton from "../buttons/ArrowButton";

const CustomCarousel = ({ children }: { children?: React.ReactNode }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // const CustomButton = ({ next, previous }:ButtonGroupProps) => {
    
  //   return (
  //     <div className="flex gap-space-15 justify-center z-10 py-10">
  //       <ArrowButton
  //         className="transform rotate-0"
  //         onClick={previous}
  //       />
  //       <ArrowButton className="transform rotate-180" onClick={next} />
  //     </div>
  //   );
  // };

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        arrows={false}
        showDots={false}
        itemClass="carousel-item"
        renderButtonGroupOutside={true}
        // customButtonGroup={<CustomButton />}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
