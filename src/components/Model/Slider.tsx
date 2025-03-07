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
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      style={{ backgroundColor: 'black', maxWidth: '1440px', margin: '0 auto' }}
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
