import React, { useState, useEffect } from 'react';
import './App.css';

// Function to preload images
function preloadImages(imageUrls) {
  return Promise.all(
    imageUrls.map(
      url =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
        })
    )
  );
}

function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false); // Define state for image loading
  const [currentFrameComp, setCurrentFrameComp] = useState(0);
  const [isAnimatingComp, setIsAnimatingComp] = useState(true); // Define state for Comp animation
  
  const frameCount = 8; // Total number of frames (mevid0.png through mevid7.png)
  const frameDuration = 50; // Duration per frame (100ms = 10fps)
  const frameCountComp = 15; // Total number of frames for Comp (Comp000 - Comp014)
  const frameDuration2 = 20; // Duration per frame (100ms = 10fps)

  const imageUrls = Array.from({ length: frameCount }, (_, i) => `meVid/mevid${i}.png`);
  const imageUrlsComp = Array.from({ length: frameCountComp }, (_, i) => `purpComp/Comp${String(i).padStart(3, '0')}.png`);

  useEffect(() => {
    preloadImages(imageUrls).then(() => {
      setImagesLoaded(true);
    }).catch(error => {
      console.error('Error preloading images:', error);
    });
  }, [imageUrls]);

  useEffect(() => {
    if (isAnimating && imagesLoaded) {
      const interval = setInterval(() => {
        setCurrentFrame((prevFrame) => {
          if (prevFrame === frameCount - 1) {
            setIsAnimating(false); // Stop animation when sequence finishes
          }
          return (prevFrame + 1) % frameCount;
        });
      }, frameDuration);

      return () => clearInterval(interval);
    } else if (!isAnimating && imagesLoaded) {
      const timeout = setTimeout(() => {
        setCurrentFrame(0);
        setIsAnimating(true);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating, imagesLoaded]);

  useEffect(() => {
    preloadImages(imageUrlsComp).then(() => {
      setIsAnimatingComp(true);
    }).catch(error => {
      console.error('Error preloading images for Comp:', error);
    });
  }, [imageUrlsComp]);

  useEffect(() => {
    if (isAnimatingComp) {
      const interval = setInterval(() => {
        setCurrentFrameComp((prevFrame) => (prevFrame + 1) % frameCountComp);
      }, frameDuration2);

      return () => clearInterval(interval);
    }
  }, [isAnimatingComp]);

  return (
    <div className="App">
      <div className="media-wrapper">
        {/* Background image */}
        <img src="HomeBG.png" alt="background" className="responsive-image" />

        <div className="menu-container">
          <img src="menu.png" alt="menu" className="menu" />
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            <h1 className="styled-text">About</h1>
          </a>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            <h1 className="styled-text2">Work</h1>
          </a>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            <h1 className="styled-text3">Contact</h1>
          </a>
        </div>

        {/* Name image relative to HomeBG */}
        <img src="myName.png" alt="Kevin Villanueva's name" className="name" />

        <img src="initials.png" alt="initials KV" className="initials" />

        <img src="id.png" alt="id" className="id" />

        <img src="phone.png" alt="phone" className="phone" />

        <img src="save.png" alt="save" className="save" />

        {/* Image of yourself */}
        <img src="me.png" alt="Kevin Villanueva" className="your-self" />

        {/* PNG sequence */}
        {imagesLoaded && (
          <img
            src={`meVid/mevid${currentFrame}.png`}
            alt={`mevid frame ${currentFrame}`}
            className="your-self"
          />
        )}

        {/* Second PNG sequence (Comp) */}
        {imagesLoaded && (
          <img
            src={`purpComp/Comp${String(currentFrameComp).padStart(3, '0')}.png`}
            alt={`Comp frame ${currentFrameComp}`}
            className="bluCircAnim"
          />
        )}
      </div>
    </div>
  );
}

export default App;
