import React from 'react'
import Sketch from 'react-p5'
import {complex, multiply, add, re, im, abs} from 'mathjs'


function App() {
  const width = 1450
  const height = 1000
  const allPoints = []
  const diameter = 900
  const multiplier = diameter/4
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    for(let i = 0; i < diameter; i += 1) {
      for(let j = 0; j < diameter; j += 1) {
        let z = 0
        const c = complex((i - diameter / 2) / multiplier, (j - diameter / 2) / multiplier)
        if(mandelbrotFunc(0, c).abs > 2) continue
        let res
        let colorNum = 0
        for(let i = 0; i <= 15; i++) {
          res = mandelbrotFunc(z, c)
          if(res.abs > 2) break
          z = res.c
          colorNum = colorNum + 10
        }
        let abs = res.abs
        if (abs >= 2 ) {
          let point = {
            complex: c,
            r: re(c),
            i: im(c),
            color: colorNum
          }
          allPoints.push(point)
        }
      }
    }
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
    p5.fill(255,255,255)
    p5.stroke(4)
    p5.circle(0,0,diameter)
    p5.strokeWeight(1);
    p5.stroke('rgb(123,0,0)'); 

    let tmp = 0
    for(let j = 0; j < allPoints.length; j++) {
      const r = allPoints[j].r * multiplier
      const i = allPoints[j].i * multiplier
      p5.stroke('rgb(' + allPoints[j].color % 255 + ','+ allPoints[j].color % 255 + ',' + allPoints[j].color % 255 +')'); 
      p5.point(r, i)
    } 
    p5.circle(0, 0, 2)
  }
  
  return <Sketch setup={setup} draw={draw} />
}

export default App