import Slider from 'react-slick';
import '@__styles/slick.scss';
import '@__styles/slick-theme.scss';
import { ReactNode } from 'react';
const initSlider = ({
  children,
  // num,
}: {
  children: ReactNode;
  // num: number;
}) => {
  //config slick
  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 2.8,
    slidesToScroll: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.9,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div id='slick-customization'>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default initSlider;
