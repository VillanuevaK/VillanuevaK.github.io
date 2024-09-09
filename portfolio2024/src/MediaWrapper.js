// MediaWrapper.js
import React from 'react';

const MediaWrapper = ({ currentGlitchFrame, currentNeonFrame: currentNeonFrame }) => (
  <div className="media-wrapper">
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
{/* TODO: Figure out how to these relative to the menu and then organize the CSS*/}
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
      <img src="id.png" alt="id" className="id" />
    </a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
      <img src="phone.png" alt="phone" className="phone" />
    </a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
      <img src="save.png" alt="save" className="save" />
    </a>

    <img src="myName.png" alt="Kevin Villanueva's name" className="name" />
    <img src="initials.png" alt="initials KV" className="initials" />
    <img src="me.png" alt="Kevin Villanueva" className="your-self" />

    <img
    src={`meVid/mevid${currentGlitchFrame}.png`}
    alt={`mevid frame ${currentGlitchFrame}`}
    className="your-self"
    />

    <img
    src={`purpComp/Comp${String(currentNeonFrame).padStart(3, '0')}.png`}
    alt={`Neon circle frame ${currentNeonFrame}`}
    className="neonCircle"
    />
    
  </div>
);

export default MediaWrapper;
