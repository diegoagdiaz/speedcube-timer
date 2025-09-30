import React, { useRef, useEffect } from 'react';

function CubeVisualizerWrapper({ scramble }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = 'cube-visualizer-script';
    const linkId = 'cube-visualizer-style';

    // Guard: If script already loaded, do nothing.
    if (window.applyScrambleToCube) {
      return;
    }

    // Create and append script and stylesheet
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = '/cube-script.js';
    script.onload = () => {
      // Assume the JS initializes the cube in the container
      if (window.initializeCube && containerRef.current) {
        window.initializeCube(containerRef.current);
      }
    };
    script.onerror = () => {
      console.error('Failed to load cube-script.js');
    };
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = '/cube-style.css';
    document.head.appendChild(link);

    // Disable cube interactions
    const handleKeyDown = (event) => {
      const cubeKeys = ['r', 'l', 'u', 'd', 'f', 'b', 'R', 'L', 'U', 'D', 'F', 'B', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'g', 'z', 'v', 'a', 'A'];
      if (cubeKeys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true); // capture phase

    // Cleanup function to run on unmount
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) document.body.removeChild(existingScript);

      const existingLink = document.getElementById(linkId);
      if (existingLink) document.head.removeChild(existingLink);

      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  useEffect(() => {
    if (window.applyScrambleToCube && scramble) {
      window.applyScrambleToCube(scramble);
    }
  }, [scramble]);

  return (
    <div ref={containerRef} style={{ width: '200px', height: '200px', position: 'relative' }}>
      <div className="cube s23 hide">
        <div className="front">
          <div className="part" id="f1"></div>
          <div className="part" id="f2"></div>
          <div className="part" id="f3"></div>
          <div className="part" id="f4"></div>
          <div className="part" id="f5"></div>
          <div className="part" id="f6"></div>
          <div className="part" id="f7"></div>
          <div className="part" id="f8"></div>
          <div className="part" id="f9"></div>
        </div>
        <div className="back">
          <div className="part" id="b1"></div>
          <div className="part" id="b2"></div>
          <div className="part" id="b3"></div>
          <div className="part" id="b4"></div>
          <div className="part" id="b5"></div>
          <div className="part" id="b6"></div>
          <div className="part" id="b7"></div>
          <div className="part" id="b8"></div>
          <div className="part" id="b9"></div>
        </div>
        <div className="up">
          <div className="part" id="u1"></div>
          <div className="part" id="u2"></div>
          <div className="part" id="u3"></div>
          <div className="part" id="u4"></div>
          <div className="part" id="u5"></div>
          <div className="part" id="u6"></div>
          <div className="part" id="u7"></div>
          <div className="part" id="u8"></div>
          <div className="part" id="u9"></div>
        </div>
        <div className="down">
          <div className="part" id="d1"></div>
          <div className="part" id="d2"></div>
          <div className="part" id="d3"></div>
          <div className="part" id="d4"></div>
          <div className="part" id="d5"></div>
          <div className="part" id="d6"></div>
          <div className="part" id="d7"></div>
          <div className="part" id="d8"></div>
          <div className="part" id="d9"></div>
        </div>
        <div className="right">
          <div className="part" id="r1"></div>
          <div className="part" id="r2"></div>
          <div className="part" id="r3"></div>
          <div className="part" id="r4"></div>
          <div className="part" id="r5"></div>
          <div className="part" id="r6"></div>
          <div className="part" id="r7"></div>
          <div className="part" id="r8"></div>
          <div className="part" id="r9"></div>
        </div>
        <div className="left">
          <div className="part" id="l1"></div>
          <div className="part" id="l2"></div>
          <div className="part" id="l3"></div>
          <div className="part" id="l4"></div>
          <div className="part" id="l5"></div>
          <div className="part" id="l6"></div>
          <div className="part" id="l7"></div>
          <div className="part" id="l8"></div>
          <div className="part" id="l9"></div>
        </div>
      </div>
      <div className="plane-cube">
        <div className="front">
          <div className="part" id="xf1"></div>
          <div className="part" id="xf2"></div>
          <div className="part" id="xf3"></div>
          <div className="part" id="xf4"></div>
          <div className="part" id="xf5"></div>
          <div className="part" id="xf6"></div>
          <div className="part" id="xf7"></div>
          <div className="part" id="xf8"></div>
          <div className="part" id="xf9"></div>
        </div>
        <div className="back">
          <div className="part" id="xb1"></div>
          <div className="part" id="xb2"></div>
          <div className="part" id="xb3"></div>
          <div className="part" id="xb4"></div>
          <div className="part" id="xb5"></div>
          <div className="part" id="xb6"></div>
          <div className="part" id="xb7"></div>
          <div className="part" id="xb8"></div>
          <div className="part" id="xb9"></div>
        </div>
        <div className="up">
          <div className="part" id="xu1"></div>
          <div className="part" id="xu2"></div>
          <div className="part" id="xu3"></div>
          <div className="part" id="xu4"></div>
          <div className="part" id="xu5"></div>
          <div className="part" id="xu6"></div>
          <div className="part" id="xu7"></div>
          <div className="part" id="xu8"></div>
          <div className="part" id="xu9"></div>
        </div>
        <div className="down">
          <div className="part" id="xd1"></div>
          <div className="part" id="xd2"></div>
          <div className="part" id="xd3"></div>
          <div className="part" id="xd4"></div>
          <div className="part" id="xd5"></div>
          <div className="part" id="xd6"></div>
          <div className="part" id="xd7"></div>
          <div className="part" id="xd8"></div>
          <div className="part" id="xd9"></div>
        </div>
        <div className="right">
          <div className="part" id="xr1"></div>
          <div className="part" id="xr2"></div>
          <div className="part" id="xr3"></div>
          <div className="part" id="xr4"></div>
          <div className="part" id="xr5"></div>
          <div className="part" id="xr6"></div>
          <div className="part" id="xr7"></div>
          <div className="part" id="xr8"></div>
          <div className="part" id="xr9"></div>
        </div>
        <div className="left">
          <div className="part" id="xl1"></div>
          <div className="part" id="xl2"></div>
          <div className="part" id="xl3"></div>
          <div className="part" id="xl4"></div>
          <div className="part" id="xl5"></div>
          <div className="part" id="xl6"></div>
          <div className="part" id="xl7"></div>
          <div className="part" id="xl8"></div>
          <div className="part" id="xl9"></div>
        </div>
      </div>
      <div id="sequence">
        <div id="seq">&nbsp;</div>
      </div>
      <div className="buttons">
        <div className="sub-buttons face-btn">
          <div className="btn-title">Clockwise</div>
          <button type="button" className="left">L</button>
          <button type="button" className="up">U</button>
          <button type="button" className="right">R</button>
          <button type="button" className="down">D</button>
          <button type="button" className="front">F</button>
          <button type="button" className="back">B</button>
        </div>
        <div className="sub-buttons main-btn">
          <div className="view-btn">
            <button type="button" className="left cube-turn" style={{ gridRow: '2/3', gridColumn: '1/2' }}>&larr;</button>
            <button type="button" className="up cube-turn" style={{ gridRow: '1/2', gridColumn: '2/3' }}>&uarr;</button>
            <button type="button" className="right cube-turn" style={{ gridRow: '2/3', gridColumn: '3/4' }}>&rarr;</button>
            <button type="button" className="down cube-turn" style={{ gridRow: '2/3', gridColumn: '2/3' }}>&darr;</button>
          </div>
          <div className="misc-btn">
            <button type="button" className="generate">Scramble</button>
            <button type="button" className="reset">Reset</button>
            <button type="button" className="view">View</button>
            <button type="button" className="start-animation">Start Animation</button>
            <button type="button" className="stop-animation">Stop Animation</button>
          </div>
        </div>
        <div className="sub-buttons face-prime-btn">
          <div className="btn-title">Anti-clockwise</div>
          <button type="button" className="left">L'</button>
          <button type="button" className="up">U'</button>
          <button type="button" className="right">R'</button>
          <button type="button" className="down">D'</button>
          <button type="button" className="front">F'</button>
          <button type="button" className="back">B'</button>
        </div>
      </div>
    </div>
  );
}

export default CubeVisualizerWrapper;