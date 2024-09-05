import React, { useEffect } from 'react';
import './App.css'; 

function App() {
  useEffect(() => {
    // JavaScript to add the 'normal' class after 1 second
    const timer = setTimeout(() => {
      document.querySelectorAll('.channel-split').forEach(el => el.classList.add('normal'));
    }, 1900); // 1.9 second delay

    // Cleanup timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <div className="channel-split-wrapper">
        <img src="me.png" alt="Kevin Villanueva" className="your-self channel-split-static" />
        <img src="me.png" alt="Kevin Villanueva" className="your-self channel-split channel-split-red" />
        <img src="me.png" alt="Kevin Villanueva" className="your-self channel-split channel-split-green" />
        <img src="me.png" alt="Kevin Villanueva" className="your-self channel-split channel-split-blue" />
      </div>
      <img src="HomeBG.png" alt="background" className="responsive-image" />    
    </div>
  );
}

export default App;
