import React from 'react';
import Slider from 'react-slick';
import Home1 from '../assets/Homepics/home1.png';
import Home2 from '../assets/Homepics/home2.jpg';
import Home3 from '../assets/Homepics/home3.jpg';
import Home4 from '../assets/Homepics/home4.jpg';
import Home5 from '../assets/Homepics/home5.jpg';

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,           
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,   
    pauseOnHover: false,  
    arrows: false
  };

    return (
    <section id="home" className='animate-on-scroll'>
    <div className="w-full h-71 sm:h-80 md:h-120 mx-auto">
      <Slider {...settings}>
        <div>
          <img src={Home1} alt="Slide 1" className="w-full h-70 sm:h-80 md:h-120" />
        </div>
        <div>
          <img src={Home2} alt="Slide 2" className="w-full h-70 sm:h-80 md:h-120" />
        </div>
        <div>
          <img src={Home3} alt="Slide 3" className="w-full h-70 sm:h-80 md:h-120" />
        </div>
        <div>
          <img src={Home4} alt="Slide 4" className="w-full h-70 sm:h-80 md:h-120" />
        </div>
        <div>
          <img src={Home5} alt="Slide 5" className="w-full h-70 sm:h-80 md:h-120" />
        </div>
      </Slider>
    </div>
    </section>
  );
};

export default Home;
