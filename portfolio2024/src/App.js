import React, { useState, useEffect } from 'react';
import { useAnimation } from './useAnimation'; // Importing the custom hook
import MediaWrapper from './MediaWrapper'; // Importing the new component
import './App.css';

function App() {
  const glitchFrameCount = 8;
  const glitchFrameDuration = 50;
  const neonFrameCount = 15;
  const neonFrameDuration = 20;

  const currentGlitchFrame = useAnimation(glitchFrameCount, glitchFrameDuration, 4000);
  const currentNeonFrame = useAnimation(neonFrameCount, neonFrameDuration);

  return (
    <div className="App">
      <MediaWrapper
        currentGlitchFrame={currentGlitchFrame}
        currentNeonFrame={currentNeonFrame}
      />
    </div>
  );
}

export default App;
