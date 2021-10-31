import React, { useEffect, useState } from 'react'
import Sketch from 'react-p5'
import {complex, multiply, add, re, im, abs} from 'mathjs'

const Fractal = (props) => {
    useEffect(() => {
        setMultiplier(diameter/props.scale)
    })
    const [allPoints, setAllPoints] = useState([])
    const width = 700
    const height = 700
    const diameter = 700
    // const multiplier = diameter/props.scale
    const [multiplier, setMultiplier] = useState(diameter/props.scale)
    const setup = (p5) => {
        p5.createCanvas(width, height).parent('fractalContainer')
        p5.pixelDensity(1)
        let start = new Date()
        for(let i = 0; i < diameter ; i += 1) {
            for(let j = 0; j < diameter; j += 1) {
                let z = 0
                const c = complex((i - diameter / 2) / multiplier, (j - (diameter) / 2) / multiplier)
                if(abs(complex(c.re + 0.25, c.im)) < 0.5) {
                    let point = {
                        complex: c,
                        re: re(c),
                        im: im(c),
                        color: 254,
                    }
                    allPoints.push(point)
                    continue
                }
                // if(mandelbrotFunc(0, c).abs > 2) continue
                let res
                let colorNum = 0
                let iterationCount = 15
                let colorAdder = Math.round(255 / iterationCount)
                for(let i = 0; i < iterationCount; i++) {
                    res = mandelbrotFunc(z, c)
                    if(res.abs > 2) break
                    z = res.c
                    colorNum = colorNum + colorAdder
                }
                if(res.abs < 2) {colorNum = 254}
                let point = {
                    complex: c,
                    re: re(c),
                    im: im(c),
                    color: colorNum % 255,
                }
                allPoints.push(point)
            }
        }
        console.log(new Date() - start)
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
        // p5.clear()
        p5.translate(width/2, height/2 ); 
        p5.scale(1, -1);
        p5.strokeWeight(3);
        p5.stroke('rgb(123,0,0)'); 
        p5.loadPixels()
        switch(props.colorMode){
            case 'black':{
                for(let i = 0; i < allPoints.length; i++) {
                    const x = allPoints[i].re * multiplier
                    const y = allPoints[i].im * multiplier
                    let index = Math.round((x  + width/2  + (y  + height/2 ) * width ) * 4);
                    p5.pixels[index + 0] = (allPoints[i].color);
                    p5.pixels[index + 1] = (allPoints[i].color);
                    p5.pixels[index + 2] = (allPoints[i].color);
                    p5.pixels[index + 3] = 255;
                }
                break;
            }
            case 'white':{
                for(let i = 0; i < allPoints.length; i++) {
                    const x = allPoints[i].re * multiplier
                    const y = allPoints[i].im * multiplier
                    let index = Math.round((x  + width/2  + (y  + height/2 ) * width ) * 4);
                    p5.pixels[index + 0] = (255 - allPoints[i].color);
                    p5.pixels[index + 1] = (255 - allPoints[i].color);
                    p5.pixels[index + 2] = (255 - allPoints[i].color);
                    p5.pixels[index + 3] = 255;
                }
                break;
            }
            case 'rainbow':{
                for(let i = 0; i < allPoints.length; i++) {
                    const x = allPoints[i].re * multiplier
                    const y = allPoints[i].im * multiplier
                    let index = Math.round((x  + width/2  + (y  + height/2 ) * width ) * 4);
                    p5.pixels[index + 0] = (allPoints[i].color + x);
                    p5.pixels[index + 1] = (allPoints[i].color);
                    p5.pixels[index + 2] = (allPoints[i].color + y);
                    p5.pixels[index + 3] = 255;
                }
                break;
            }

        }
        p5.updatePixels()
    }
  
    return (
    <>
        <Sketch setup={setup} draw={draw} />
    </>
  )
}

export default Fractal
