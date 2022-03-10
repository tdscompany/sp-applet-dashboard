import React from 'react';
import Carousel, { consts } from 'react-elastic-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const CarouselItem = (props, {children}) => {
  return (
    <Carousel breakPoints={breakPoints}>
        {children}
    </Carousel>
  )
};

export default CarouselItem;