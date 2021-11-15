import React , { useState, useImperativeHandle, forwardRef} from 'react'
import Sketch from "react-p5";
const Color = forwardRef((props, ref) => {

    const hsl2rgb = (h, s, l) => {
        let r, g, b;
      
        if (s == 0) {
          r = g = b = l;
        } else {
          function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          }
      
          let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          let p = 2 * l - q;
      
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        return { r: r * 255, g: g * 255, b: b * 255 };
    }

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
            c: +c.toFixed(4),
            m: +m.toFixed(4),
            y: +y.toFixed(4),
            k: +k.toFixed(4),
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
    const [orgPixels, setOriginalPixels] = useState([])
    const [pointedPixel, setPointedPixel] = useState('')
    const [p52, setP52] = useState()
    useImperativeHandle(ref, () => ({
        save() {
          p52.saveCanvas()
        }
    }));

    const preload = (p5) => {
        image = p5.loadImage(props.imageUrl)
    }; 

    const setup = (p5) => {
		p5.createCanvas(props.size.x, props.size.y).parent('changedImage');
        p5.pixelDensity(1)
        p5.image(image, 0, 0, props.size.x, props.size.y)
        p5.loadPixels()
        for (let x = 0; x < props.size.x; x++) {
            for (let y = 0; y < props.size.y; y++) {
                const index = Math.round((x  + (y) * props.size.x ) * 4);
                let hslPixel = rgb2hsl(p5.pixels[index + 0], p5.pixels[index + 1], p5.pixels[index + 2])
                if (hslPixel.s < 0.2 && hslPixel.l < 0.60 && hslPixel.l > 0.40) {
                    orgPixels.push({index, hslPixel})
                }
            }
        }
    };
    
	const draw = (p5) => {
        if(image !== undefined)
            p5.image(image, 0, 0, props.size.x, props.size.y)
        p5.loadPixels()
        for (let x = 0; x < orgPixels.length; x++) {
            let l
            if (props.range < 50) {
                l = p5.map(props.range, 0, 50, 0, orgPixels[x].hslPixel.l)
            }
            else {
                l = p5.map(props.range, 50, 100, orgPixels[x].hslPixel.l, 1)
            }
            let changedRgbPixel = hsl2rgb(orgPixels[x].hslPixel.h, orgPixels[x].hslPixel.s, l)
            p5.pixels[orgPixels[x].index + 0] = changedRgbPixel.r
            p5.pixels[orgPixels[x].index + 1] = changedRgbPixel.g
            p5.pixels[orgPixels[x].index + 2] = changedRgbPixel.b
        }            
        p5.updatePixels();
        setP52(p5)
        let rgbPixel = p5.get(p5.mouseX, p5.mouseY); 
        if(props.colorType === 'HSL') {
            let hslPixel = rgb2hsl(rgbPixel[0], rgbPixel[1], rgbPixel[2]) 
            setPointedPixel('H: ' + hslPixel.h + ' S: ' + hslPixel.s + ' L: ' + hslPixel.l )

        } else {
            let cmykPixel = rgb2cmyk(rgbPixel[0], rgbPixel[1], rgbPixel[2], true) 
            setPointedPixel('C: ' + cmykPixel.c + ' M: ' + cmykPixel.m + ' Y: ' + cmykPixel.y + ' K: ' + cmykPixel.k)
        }
    };

    return(
        <>
            <Sketch setup={setup} draw={draw} preload={preload}/>
            <div id='changedImage'></div>
            <div>{pointedPixel}</div>
        </>
    )
    
})

export default Color
