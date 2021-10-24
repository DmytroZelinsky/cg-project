import React from 'react'
import Sketch from 'react-p5'
import {complex, multiply, add, re, im, abs} from 'mathjs'


function App() {
  const width = 1700
  const height = 1500
  const allPoints = []
  const diameter = 750
  const multiplier = diameter/4
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.pixelDensity(1)
    for(let i = 0; i < diameter; i += 1) {
      for(let j = 0; j < diameter; j += 1) {
        let z = 0
        const c = complex((i - diameter / 2) / multiplier, (j - diameter / 2) / multiplier)
        if(mandelbrotFunc(0, c).abs > 2) continue
        let res
        let colorNum = 0
        for(let i = 0; i <= 17; i++) {
          res = mandelbrotFunc(z, c)
          if(res.abs > 2) break
          z = res.c
          colorNum = colorNum + 10
        }
        let abs = res.abs
        if (abs >= 2 ) {
          let point = {
            complex: c,
            re: re(c),
            im: im(c),
            color: colorNum
          }
          allPoints.push(point)
        }
      }
    }
    console.log(allPoints)
  }
  //z = z^2 + C
  const mandelbrotFunc = (z, c) => {
    const complex = add(multiply(z,z),(c));
    let res = {
      abs: abs(complex),
      c: complex
    }
    return res;
  }
  const draw = p5 => {
    p5.translate(width/2, height/2); 
    p5.scale(1, -1);
    p5.strokeWeight(3);
    p5.stroke('rgb(123,0,0)'); 
    p5.circle(0, 0, diameter)
    p5.loadPixels()
    for(let i = 0; i < allPoints.length; i++) {
      const x = allPoints[i].re * multiplier
      const y = allPoints[i].im * multiplier
      let index = (x + width/2 + (y + height/2) * width) * 4;

      p5.pixels[index + 0] = allPoints[i].color % 255;
      p5.pixels[index + 1] = allPoints[i].color % 255;
      p5.pixels[index + 2] = allPoints[i].color % 255;
      p5.pixels[index + 3] = 255;
    } 
    p5.updatePixels()
  }
  
  return <Sketch setup={setup} draw={draw} />
}

export default App