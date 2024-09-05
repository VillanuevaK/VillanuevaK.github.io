// useGlitchEffect.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useGlitchEffect = (imageSrc) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const imageContainer = containerRef.current;
    const imageElement = imageRef.current;

    let scene, camera, renderer, planeMesh;
    let isHovered = false;
    let hoverDuration = 0;

    const ANIMATION_CONFIG = {
      updateFrequency: 0.1,
      glitchIntensityMod: 0.5
    };

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

    const initializeScene = (texture) => {
      camera = new THREE.PerspectiveCamera(
        80,
        imageElement.offsetWidth / imageElement.offsetHeight,
        0.01,
        10
      );
      camera.position.z = 1;

      scene = new THREE.Scene();

      const shaderUniforms = {
        tDiffuse: { value: texture },
        glitchIntensity: { value: 0.0 }
      };

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

      imageContainer.appendChild(renderer.domElement);

      imageContainer.addEventListener('mouseover', () => {
        isHovered = true;
      });

      imageContainer.addEventListener('mouseout', () => {
        isHovered = false;
        shaderUniforms.glitchIntensity.value = 0;
      });
    };

    initializeScene(new THREE.TextureLoader().load(imageElement.src));

    const animateScene = () => {
      requestAnimationFrame(animateScene);

      if (isHovered) {
        hoverDuration += ANIMATION_CONFIG.updateFrequency;

        if (hoverDuration >= 0.5) {
          hoverDuration = 0;
          planeMesh.material.uniforms.glitchIntensity.value = Math.random() * ANIMATION_CONFIG.glitchIntensityMod;
        }
      }

      renderer.render(scene, camera);
    };

    animateScene();

    return () => {
      if (renderer) {
        renderer.dispose();
      }

      if (planeMesh) {
        planeMesh.geometry.dispose();
        planeMesh.material.dispose();
      }

      if (imageElement) {
        imageElement.src = ''; // Remove the image source to free memory
      }

      // Remove the canvas element from the DOM
      if (renderer && renderer.domElement) {
        imageContainer.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc]);

  return {
    containerRef,
    imageRef
  };
};

export default useGlitchEffect;
