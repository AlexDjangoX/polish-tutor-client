import React from 'react';
import './Hero.css';

const Hero = () => {
  const youTubeUrl = 'https://vimeo.com/786250341';

  return (
    <>
      <div className='hero-container'>
        <h1>Polish Language Ninja</h1>

        <div className='video'>
          {youTubeUrl && (
            <>
              <div style={{ padding: '75% 0 0 0', position: 'relative' }}>
                <iframe
                  src='https://player.vimeo.com/video/786325458?h=f713208f76&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                  frameborder='0'
                  allow='autoplay; fullscreen; picture-in-picture'
                  allowfullscreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  title='2023-01-04 13-35-45.mkv'
                ></iframe>
              </div>
            </>
          )}
        </div>

        <main className='hero-main'>
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
