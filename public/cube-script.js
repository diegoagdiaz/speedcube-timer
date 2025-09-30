// public/cube-script.js

function initializeCubeVisualizer() {
  if (window.isCubeVisualizerInitialized) {
    return;
  }

  let mainColor = [
    "rgb(255, 0, 0)",      // right (red)
    "rgb(255, 140, 0)",   // left (orange)
    "rgb(255, 255, 255)", // up (white)
    "rgb(255, 255, 0)",   // down (yellow)
    "rgb(0, 128, 0)",     // front (green)
    "rgb(0, 0, 255)",     // back (blue)
  ];
  let direction = ["right", "left", "up", "down", "front", "back"];
  let sideArray = [
    ["xu3", "xu6", "xu9", "xf3", "xf6", "xf9", "xd3", "xd6", "xd9", "xb7", "xb4", "xb1"],
    ["xb3", "xb6", "xb9", "xd7", "xd4", "xd1", "xf7", "xf4", "xf1", "xu7", "xu4", "xu1"],
    ["xf1", "xf2", "xf3", "xr1", "xr2", "xr3", "xb1", "xb2", "xb3", "xl1", "xl2", "xl3"],
    ["xr9", "xr8", "xr7", "xf9", "xf8", "xf7", "xl9", "xl8", "xl7", "xb9", "xb8", "xb7"],
    ["xd1", "xd2", "xd3", "xr7", "xr4", "xr1", "xu9", "xu8", "xu7", "xl3", "xl6", "xl9"],
    ["xu1", "xu2", "xu3", "xr3", "xr6", "xr9", "xd9", "xd8", "xd7", "xl7", "xl4", "xl1"],
  ];
  let faceArray = ["3", "2", "1", "4", "7", "8", "9", "6"];
  let direction_index = new Map();
  for (let i = 0; i < 6; i++) {
    direction_index.set(direction[i][0], i);
  }

  function turn(index, face) {
    let faceColorArray = [];
    for (let i = 0; i < 8; i++) {
      let currentElement = document.getElementById("x" + face + faceArray[i]);
      if (currentElement) {
        faceColorArray.push(
          window.getComputedStyle(currentElement).getPropertyValue("background-color")
        );
      }
    }
    for (let i = 0; i < 8; i++) {
      const element = document.getElementById("x" + face + faceArray[i]);
      if (element) {
        element.style.backgroundColor = faceColorArray[(i + 2) % 8];
      }
    }

    let sideColorArray = [];
    for (let i = 0; i < 12; i++) {
      let currentElement = document.getElementById(sideArray[index][i]);
      if (currentElement) {
        sideColorArray.push(
          window.getComputedStyle(currentElement).getPropertyValue("background-color")
        );
      }
    }
    for (let i = 0; i < 12; i++) {
      const element = document.getElementById(sideArray[index][i]);
      if (element) {
        element.style.backgroundColor = sideColorArray[(i + 3) % 12];
      }
    }
  }

  function faceTurn(key) {
    turn(direction_index.get(key), key);
  }

  function faceTurnPrime(key) {
    let m = key.toLowerCase();
    for (let i = 0; i < 3; i++) {
      turn(direction_index.get(m), m);
    }
  }

  function resetColor() {
    for (let i = 0; i < 6; i++) {
      let pieces = document.querySelectorAll("." + direction[i] + " .part");
      for (let j = 0; j < 9; j++) {
          if(pieces[j]) pieces[j].style.backgroundColor = mainColor[i];
      }
    }
  }

  window.applyScrambleToCube = function(scrambleString) {
    resetColor();
    let movesArr = scrambleString.trim().split(/\s+/);
    for (let move of movesArr) {
      if (!move) continue;
      let face = move[0].toLowerCase();
      if (move.includes("'")) {
        faceTurnPrime(face.toUpperCase());
      } else if (move.includes("2")) {
        faceTurn(face);
        faceTurn(face);
      } else {
        faceTurn(face);
      }
    }
  };
  
  window.isCubeVisualizerInitialized = true;
}

window.initializeCubeVisualizer = initializeCubeVisualizer;