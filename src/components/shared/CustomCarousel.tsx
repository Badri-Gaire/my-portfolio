'use client';
import React from 'react';
import Carousel from 'react-multi-carousel';

const TestimonialSlider = ({ children }: { children?: React.ReactNode }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const CustomDot: React.FC<{ onClick: () => void; active: boolean }> = ({
    onClick,
    active,
  }) => {
    return (
      <button
        onClick={onClick}
        className={`mx-1 h-2 w-2 rounded-full transition-colors ${
          active ? 'bg-store-primary' : 'bg-store-secondary'
        }`}
        aria-label="Go to slide"
      />
    );
  };
  return (
    <div className="relative ">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={8000}
        showDots={true}
        arrows={false}
        itemClass="carousel-item"
        renderDotsOutside={true}
        // className='space-x-6'
        customDot={<CustomDot onClick={() => {}} active={false} />}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default TestimonialSlider;
