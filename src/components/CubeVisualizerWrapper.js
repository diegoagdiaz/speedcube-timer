import React, { useEffect } from 'react';

function CubeVisualizerWrapper({ scramble }) {

  useEffect(() => {
    const scriptId = 'cube-visualizer-script';
    const styleId = 'cube-visualizer-style';
    const planePartsId = 'plane-parts-style';

    // Cleanup function to remove everything on unmount
    const cleanup = () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      const style = document.getElementById(styleId);
      if (style) style.remove();
      const planeParts = document.getElementById(planePartsId);
      if(planeParts) planeParts.remove();


      // Clean up global function to allow re-loading
      window.initializeCubeVisualizer = undefined;
      window.applyScrambleToCube = undefined;
      window.isCubeVisualizerInitialized = undefined;
    };

    // If script is already there, cleanup before re-adding
    if (document.getElementById(scriptId)) {
        cleanup();
    }

    const loadAsset = (id, href, type) => {
        const tag = document.createElement(type);
        tag.id = id;
        if(type === 'link'){
            tag.rel = 'stylesheet';
            tag.href = href;
        } else {
            tag.src = href;
        }
        document.head.appendChild(tag);
        return tag;
    }

    const style = loadAsset(styleId, '/cube-style.css', 'link');
    const planeParts = loadAsset(planePartsId, '/planeparts.css', 'link');
    const script = loadAsset(scriptId, '/cube-script.js', 'script');
    
    script.onload = () => {
      if (window.initializeCubeVisualizer) {
        window.initializeCubeVisualizer();
        if (window.applyScrambleToCube && scramble) {
          window.applyScrambleToCube(scramble);
        }
      }
    };
    
    return cleanup;

  }, []); // Run only once on mount and cleanup on unmount

  useEffect(() => {
    if (window.applyScrambleToCube && scramble) {
      window.applyScrambleToCube(scramble);
    }
  }, [scramble]);


  return (
    // This is the minimal HTML structure the script needs to draw the cube
     <div className="plane-cube">
        <div className="front">
            <div className="part" id="xf1"></div><div className="part" id="xf2"></div><div className="part" id="xf3"></div>
            <div className="part" id="xf4"></div><div className="part" id="xf5"></div><div className="part" id="xf6"></div>
            <div className="part" id="xf7"></div><div className="part" id="xf8"></div><div className="part" id="xf9"></div>
        </div>
        <div className="back">
            <div className="part" id="xb1"></div><div className="part" id="xb2"></div><div className="part" id="xb3"></div>
            <div className="part" id="xb4"></div><div className="part" id="xb5"></div><div className="part" id="xb6"></div>
            <div className="part" id="xb7"></div><div className="part" id="xb8"></div><div className="part" id="xb9"></div>
        </div>
        <div className="up">
            <div className="part" id="xu1"></div><div className="part" id="xu2"></div><div className="part" id="xu3"></div>
            <div className="part" id="xu4"></div><div className="part" id="xu5"></div><div className="part" id="xu6"></div>
            <div className="part" id="xu7"></div><div className="part" id="xu8"></div><div className="part" id="xu9"></div>
        </div>
        <div className="down">
            <div className="part" id="xd1"></div><div className="part" id="xd2"></div><div className="part" id="xd3"></div>
            <div className="part" id="xd4"></div><div className="part" id="xd5"></div><div className="part" id="xd6"></div>
            <div className="part" id="xd7"></div><div className="part" id="xd8"></div><div className="part" id="xd9"></div>
        </div>
        <div className="right">
            <div className="part" id="xr1"></div><div className="part" id="xr2"></div><div className="part" id="xr3"></div>
            <div className="part" id="xr4"></div><div className="part" id="xr5"></div><div className="part" id="xr6"></div>
            <div className="part" id="xr7"></div><div className="part" id="xr8"></div><div className="part" id="xr9"></div>
        </div>
        <div className="left">
            <div className="part" id="xl1"></div><div className="part" id="xl2"></div><div className="part" id="xl3"></div>
            <div className="part" id="xl4"></div><div className="part" id="xl5"></div><div className="part" id="xl6"></div>
            <div className="part" id="xl7"></div><div className="part" id="xl8"></div><div className="part" id="xl9"></div>
        </div>
    </div>
  );
}

export default CubeVisualizerWrapper;