import React from 'react'
import Sketch from "react-p5";

const Color = (props) => {

    const rgb2cmyk = (r, g, b, normalized) => {
        var c = 1 - (r / 255);
        var m = 1 - (g / 255);
        var y = 1 - (b / 255);
        var k = Math.min(c, Math.min(m, y));
        
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
        
        if(!normalized){
            c = Math.round(c * 10000) / 100;
            m = Math.round(m * 10000) / 100;
            y = Math.round(y * 10000) / 100;
            k = Math.round(k * 10000) / 100;
        }
        
        c = isNaN(c) ? 0 : c;
        m = isNaN(m) ? 0 : m;
        y = isNaN(y) ? 0 : y;
        k = isNaN(k) ? 0 : k;
        
        return {
            c: c,
            m: m,
            y: y,
            k: k,
        }
    }

    const rgb2hsl = (r, g, b) =>{
        r /= 255
        g /= 255
        b /= 255
      
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
      
        if (max == min) {
          h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
      
            h /= 6;
            
        }
        return { h: +h.toFixed(4), s: +s.toFixed(3), l: +l.toFixed(3) };
    }

    let image 
    const preload = (p5) => {
        // p5.image(image, 0, 0, props.size.x, props.size.y)
    };

    const setup = (p5) => {
		p5.createCanvas(props.size.x, props.size.y).parent('changedImage');
        image = p5.loadImage(props.imageUrl)
        console.log(image)
	};

	const draw = (p5) => {
        if(image !== undefined)
            p5.image(image, 0, 0, props.size.x, props.size.y)
        let pixel = p5.get(p5.mouseX, p5.mouseY)
        console.log(rgb2hsl(pixel[0],pixel[1],pixel[2]))
        p5.fill(pixel);
        p5.noStroke();
        p5.rect(25, 25, 50, 50);
	};

    return(
        <>
            <Sketch setup={setup} draw={draw} />
            <div id='changedImage'></div>
        </>
    )
    
}

export default Color
