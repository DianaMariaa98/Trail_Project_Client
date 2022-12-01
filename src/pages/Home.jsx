import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import mountainSlide1 from '../images/mount_slide1.jpg';
import mountainSlide2 from '../images/mount_slide2.jpg';
import mountainSlide3 from '../images/wall_1.jpg';


function Home() {
  return (
    <>
    <div className='carouseldiv'>
    <Carousel>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src={mountainSlide1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Challenge Yourself - Climb a mountain! </h3>
          <p>"Deserts, jungles, mountains or coast. I've never had a preference. If I'm out in nature with everything I need in the world on my back, chances are my smile is wide and my thoughts are clear."</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src={mountainSlide2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Enjoy the Struggle of the Moment</h3>
          <p>"Everyone wants to live on top of the mountain, but all the happiness and growth occurs while you are climbing it."</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src={mountainSlide3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Journey back to your Roots</h3>
          <p>
          "Hiking is not escapism, it's realism. The people who choose to spend time outdoors are not running away from anything, we are returning to where we belong"
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    <div className="footer">
      <div className='p_footer'>Developed by Diana Maria</div>
      </div>

    </>
  );
}

export default Home