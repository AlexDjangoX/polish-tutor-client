import React, { useEffect, useRef } from 'react';
import 'video.js/dist/video-js.css';
import fantasy from '@videojs/themes/dist/fantasy/index.css';
import './Video.css';
import videojs from 'video.js';

const VideoJs = ({ options }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, options);
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, videoRef, playerRef]);

  return (
    <div className='video-js'>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className={`video-js vjs-big-play-centered vjs-theme-${fantasy}`}
        ></video>
      </div>
    </div>
  );
};

export default VideoJs;
