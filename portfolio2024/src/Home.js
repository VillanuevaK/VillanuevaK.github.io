import React from 'react';
import MediaWrapper from './MediaWrapper';
import { useAnimation } from './useAnimation';
import LoadingScreen from './loading/LoadingScreen';
import useLoading from './loading/useLoading'; // Import the custom useLoading hook

const Home = () => {
  const isLoading = useLoading(1000); 

  const glitchFrameCount = 8;
  const glitchFrameDuration = 50;
  const neonFrameCount = 15;
  const neonFrameDuration = 20;

  const currentGlitchFrame = useAnimation(glitchFrameCount, glitchFrameDuration, 4000);
  const currentNeonFrame = useAnimation(neonFrameCount, neonFrameDuration);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <MediaWrapper
          currentGlitchFrame={currentGlitchFrame}
          currentNeonFrame={currentNeonFrame}
        />
      )}
    </div>
  );
};

export default Home;
