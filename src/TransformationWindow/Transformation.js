import React , { useState, useEffect } from 'react'
import Sketch from "react-p5";
import {matrix , multiply, add} from 'mathjs'
const Transformation = (props) => {
    const width = 650
    const height = 650
    // const [angle, setAngle] = useState()
    // const [center, setCenter] = useState()
    const [points, setPoints] = useState(
        [
            {x:3, y:3}, 
            {x:6, y:3}, 
            {x:6, y:6}, 
            {x:3, y:6}
        ]
    )

    // useEffect(() => {
    //     calculateSides(props.p1, props.p2)
    //     console.log('sides')
    // }, [props.p1, props.p2])

    // useEffect(() => {
    //     console.log('slider')
    // },[props.sliderValue])

    useEffect(() => {
        setPoints(props.points)
    },[props.points])

    // function toDegrees (angle) {
    //     return angle * (180 / Math.PI);
    // }

    // function toRadians(degrees) {
    //     return degrees * (Math.PI / 180);
    // }
    
    // const calculateSides = (p1, p2) => {
    //     const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
    //     console.log(angle)
    //     const rotation = 
    //     [
    //         [Math.cos(toRadians(angle)), Math.sin(toRadians(angle)),0],
    //         [-Math.sin(toRadians(angle)), Math.cos(toRadians(angle)),0],
    //         [0,0,1]
    //     ]
    //     console.log(rotation)
    //     let a = p1.x - p2.x;
    //     let b = p1.y - p2.y;
    //     let c = Math.sqrt(a*a + b*b);
    //     const p3 = multiply(multiply(multiply([p2.x, p2.y + c, 1], [[1,0,0],[0,1,0],[-p2.x,-p2.y,1]]), rotation), [[1,0,0],[0,1,0],[p2.x,p2.y,1]])
    //     const p4 = multiply(multiply(multiply([p1.x, p1.y + c, 1], [[1,0,0],[0,1,0],[-p1.x,-p1.y,1]]), rotation), [[1,0,0],[0,1,0],[p1.x,p1.y,1]])
        

    //     setPoints(
    //         [
    //             {x: p1.x, y: p1.y},
    //             {x: p2.x, y: p2.y},
    //             {x: p3[0], y: p3[1]},
    //             {x: p4[0], y: p4[1]},
    //         ]
    //     )


    //     setCenter([(p3[0] + p1.x)/2, (p3[1] + p1.y)/2])
    // }

    const setup = (p5) => {
		p5.createCanvas(width, height).parent('transformationContainer');
	};

	const draw = (p5) => {
        p5.translate(width/2, height/2); 
		p5.background(255);
        const price = 32.5
        const xCount = Math.floor(width / price)
        const yCount = Math.floor(height / price)
        p5.stroke(0)
        p5.strokeWeight(1)
        p5.fill('black')
        p5.line(-width/2, 0, width/2, 0)
        p5.line(0, height/2, 0, -height/2)
        p5.strokeWeight(0.2)
        for(let x = -xCount/2; x <= xCount/2; x++) {
            p5.line(x * price, -height/2, x * price, height/2)
            p5.circle(x * price, 0, 3)
            p5.text(x, x * price + 2, 12)
        }
        for(let y = -yCount/2; y <= yCount/2; y++) {
            if(y !== 0) {
                p5.line(-width/2, y * price, width/2, y * price)
                p5.circle(0, y * price, 3)
                p5.text(y, 12 , y * price)
            }
        }
        
        p5.strokeWeight(2)
        p5.stroke('blue')
        // p5.circle(point[0] * price, point[1] * price, 10)
        p5.noFill()
        p5.beginShape();
        p5.vertex(points[0].x * price, points[0].y * price);
        p5.vertex(points[1].x * price, points[1].y * price);
        p5.vertex(points[2].x * price, points[2].y * price);
        p5.vertex(points[3].x * price, points[3].y * price);
        p5.vertex(points[0].x * price, points[0].y * price);
        p5.endShape();
        // p5.circle(props.center[0] * price, props.center[1] * price, 10)
        p5.fill('red')
        p5.noStroke()
        p5.circle(points[0].x * price, points[0].y * price, 10)
        p5.circle(points[1].x * price, points[1].y * price, 10)

	};

	return (
    <>
        <Sketch setup={setup} draw={draw} />
        <div id ='transformationContainer'></div>
    </>
    )
}
export default Transformation
