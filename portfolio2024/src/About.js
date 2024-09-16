// About.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './menu.css'

const About = () => {
  return (
    <div className="media-wrapper-About">
      <img src="About.png" alt="background" className="responsive-bg-About" />

      <div className="menu-container-About" >
        <img src="menu.png" alt="menu" className="menu" />
        <Link to="/">
          <h1 className="styled-text1 styled-text-common">Home</h1>
          <img src="home.png" alt="home" className="id-About" />
        </Link>
        <Link to="/work">
          <h1 className="styled-text2 styled-text-common">Work</h1>
          <img src="save.png" alt="save" className="save-About" />
        </Link>
        <Link to="/contact">
          <h1 className="styled-text3 styled-text-common">Contact</h1>
          <img src="phone.png" alt="phone" className="phone-About" />
        </Link>
      </div>

    </div>
  );
};

export default About;
