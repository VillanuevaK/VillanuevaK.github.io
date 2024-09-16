// MediaWrapper.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './menu.css'

const MediaWrapper = ({ currentGlitchFrame, currentNeonFrame: currentNeonFrame }) => (
  <div className="media-wrapper">
    <img src="HomeBG.png" alt="background" className="responsive-bg" />
    
    <div className="menu-container" >
      <img src="menu.png" alt="menu" className="menu" />
      <Link to="/about">
        <h1 className="styled-text1 styled-text-common">About</h1>
        <img src="id.png" alt="id" className="id" />
      </Link>
      <Link to="/work">
        <h1 className="styled-text2 styled-text-common">Work</h1>
        <img src="save.png" alt="save" className="save" />
      </Link>
      <Link to="/contact">
        <h1 className="styled-text3 styled-text-common">Contact</h1>
        <img src="phone.png" alt="phone" className="phone" />
      </Link>
    </div>

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
