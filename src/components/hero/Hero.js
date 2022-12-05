import React from 'react';
import './Hero.css';
import VideoJS from '../video/VideoJS';
import video from '../video/earth.mp4';

const Hero = () => {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [{ src: video, type: 'video/mp4' }],
  };

  return (
    <>
      <div className='hero-container'>
        <h1>Polish Language Ninja</h1>
        <div className='video'>
          <VideoJS options={videoJsOptions} />
        </div>
        <main>
          For POLISH Language Students beginners to ADVANCED Level A1.<br></br>{' '}
          Using a combination of pattern recognition, association and
          iconisation, this resource offers you a very realistic opportunity to
          become an effective and successful Polish Language Student.
        </main>
      </div>
    </>
  );
};
export default Hero;
