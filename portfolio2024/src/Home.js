// src/Home.js
import React from 'react';
import MediaWrapper from './MediaWrapper'; // Assuming MediaWrapper is used for home content
import { useAnimation } from './useAnimation'; 

const Home = () => {
  const glitchFrameCount = 8;
  const glitchFrameDuration = 50;
  const neonFrameCount = 15;
  const neonFrameDuration = 20;

  // Use a custom hook for animations
  const currentGlitchFrame = useAnimation(glitchFrameCount, glitchFrameDuration, 4000);
  const currentNeonFrame = useAnimation(neonFrameCount, neonFrameDuration);

  return (
    <div>
      <MediaWrapper
        currentGlitchFrame={currentGlitchFrame}
        currentNeonFrame={currentNeonFrame}
      />
    </div>
  );
};

export default Home;
