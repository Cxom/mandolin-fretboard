import React, { useEffect, useRef } from 'react';
import Two from 'two.js';

function drawFretboard(two, width) {
  // Draw 4 horizontal black lines, 50px apart vertically
  for (let i = 0; i < 4; i++) {
    const y = 50 + i * 50;
    const line = two.makeLine(0, y, width, y);
    line.stroke = 'black';
    line.linewidth = 4;
  }

  // Draw leftmost vertical line (thicker)
  const leftX = 0;
  const leftLine = two.makeLine(leftX, 50, leftX, 200);
  leftLine.stroke = '#DDD';
  leftLine.linewidth = 12;

  // Draw remaining 12 vertical lines, 75px apart, 250px tall
  for (let i = 1; i < 13; i++) {
    const x = i * 75;
    const line = two.makeLine(x, 25, x, 250);
    line.stroke = '#555'; // medium gray
    line.linewidth = 3;
  }
}

const TwoScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Clean up container before appending
    if (sceneRef.current) {
      while (sceneRef.current.firstChild) {
        sceneRef.current.removeChild(sceneRef.current.firstChild);
      }
    }

    const width = 1000;
    const height = 250;
    const two = new Two({ width, height }).appendTo(sceneRef.current);

    drawFretboard(two, width);

    two.update();

    return () => {
      // Clean up Two.js instance
      if (sceneRef.current) {
        while (sceneRef.current.firstChild) {
          sceneRef.current.removeChild(sceneRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default TwoScene;
