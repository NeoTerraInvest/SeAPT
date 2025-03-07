import Slider from 'react-slick';
import '@__styles/slick.scss';
import '@__styles/slick-theme.scss';
import { ReactNode } from 'react';
const SliderTest = ({ children }: { children: ReactNode }) => {
  //config slick
  const settings = {
    dots: true,
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
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 2,
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
    <div
      id='slick-customization'
      // style={{
      //   backgroundColor: 'black',
      //   width: '100%',
      //   maxWidth: '767px',
      //   // margin: '0 auto',
      // }}
    >
      <Slider {...settings}>
        {[...new Array(9)].map((_, i) => (
          <div key={i}>{children}</div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderTest;
