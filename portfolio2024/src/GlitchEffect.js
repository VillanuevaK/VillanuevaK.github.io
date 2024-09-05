// src/GlitchEffect.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlitchEffect = ({ imageSrc }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageElement = imageRef.current;

    if (!container || !imageElement) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      80,
      imageElement.offsetWidth / imageElement.offsetHeight,
      0.01,
      10
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);
    container.appendChild(renderer.domElement);

    // Shader setup
    const vertexShader = `
      varying vec2 vUv;
      void main() {
         vUv = uv;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     }
    `;

    const fragmentShader = `
      uniform sampler2D tDiffuse;
      uniform float glitchIntensity;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec4 baseState = texture2D(tDiffuse, uv);

        if (glitchIntensity > 0.0) {
            float segment = floor(uv.y * 12.0); 
            float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
            vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;

            vec4 redGlitch = texture2D(tDiffuse, uv + offset);
            vec4 greenGlitch = texture2D(tDiffuse, uv - offset);
            vec4 blueGlitch = texture2D(tDiffuse, uv);

            if (mod(segment, 3.0) == 0.0) {
                gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
            } else if (mod(segment, 3.0) == 1.0) {
                gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
            } else {
                gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
            }
        } else {
            gl_FragColor = baseState; 
        }
      }
    `;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc, () => {
      // Image loaded callback
      console.log('Image loaded successfully');
    }, undefined, (error) => {
      // Error callback
      console.error('Error loading image:', error);
    });

    const shaderUniforms = {
      tDiffuse: { value: texture },
      glitchIntensity: { value: 0.0 }
    };

    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader,
        fragmentShader
      })
    );

    scene.add(planeMesh);

    // Event listeners
    let isHovered = false;
    let hoverDuration = 0;

    container.addEventListener("mouseover", () => {
      isHovered = true;
    });

    container.addEventListener("mouseout", () => {
      isHovered = false;
      shaderUniforms.glitchIntensity.value = 0;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (isHovered) {
        hoverDuration += 0.1;

        if (hoverDuration >= 0.5) {
          hoverDuration = 0;
          shaderUniforms.glitchIntensity.value = Math.random() * 0.5;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [imageSrc]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={imageSrc} alt="Glitch Effect" ref={imageRef} style={{ display: 'none' }} />
    </div>
  );
};

export default GlitchEffect;
