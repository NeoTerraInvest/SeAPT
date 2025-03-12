import { ReactNode } from 'react';
import Slider from 'react-slick';
const InfinitySlider = ({ children }: { children: ReactNode }) => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 8000,
    slidesToShow: 4.3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
  };

  const TrainChildren = [...Array(2)].flatMap(() => children);

  return (
    <div>
      <Slider {...settings}>{TrainChildren}</Slider>
    </div>
  );
};

export default InfinitySlider;
