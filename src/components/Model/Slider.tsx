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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
      style={{
        backgroundColor: 'black',
        width: '100%',
        maxWidth: '767px',
        // margin: '0 auto',
      }}
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
