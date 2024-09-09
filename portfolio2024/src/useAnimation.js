// useAnimation.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage frame-based animations with optional timeout between loops.
 * @param {number} frameCount - Total number of frames in the animation.
 * @param {number} frameDuration - Duration of each frame in milliseconds.
 * @param {number} timeoutDuration - Duration to wait before restarting the animation after one loop. If 0, animation loops continuously.
 * @returns {[number, boolean, Function]} - Current frame index, isAnimating state, and a function to set isAnimating.
 */
export function useAnimation(frameCount, frameDuration, timeoutDuration = 0) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (isAnimating) {
      intervalId = setInterval(() => {
        setCurrentFrame((prevFrame) => {
          if (prevFrame === frameCount - 1) {
            if (timeoutDuration > 0) {
              setIsAnimating(false); // Pause animation
            }
            return (prevFrame + 1) % frameCount; // Loop to first frame
          }
          return (prevFrame + 1) % frameCount;
        });
      }, frameDuration);
    } else if (timeoutDuration > 0) {
      timeoutId = setTimeout(() => {
        setCurrentFrame(0); // Reset to first frame
        setIsAnimating(true); // Resume animation
      }, timeoutDuration);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAnimating, frameCount, frameDuration, timeoutDuration]);

  return currentFrame;
}
