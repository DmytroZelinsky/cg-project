import React , { useState, useEffect } from 'react'
import { Form, Row, Col, Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@restart/ui/esm/Button';
import { useHistory } from 'react-router-dom'
import leftarrow from '../Theory/TheoryNav/leftarrow.png'
import Transformation from './Transformation';
import {matrix , multiply, add} from 'mathjs'

const TransformationWindow = () => {
    let history = useHistory()
    const [sliderValue, setSliderValue] = useState(0)
    const [xOffset, setXOffset] = useState(0)
    const [p1, setP1] = useState({x:3,y:3})
    const [p2, setP2] = useState({x:0,y:3})
    const [points, setPoints] = useState(
        [
            {x:3, y:3}, 
            {x:6, y:3}, 
            {x:6, y:6}, 
            {x:3, y:6}
        ]
    )
  
    useEffect(() => {
        moveShape()
    }, [sliderValue])

    useEffect(() => {
        calculateSides(p1,p2)
    }, [p1,p2])


    function toDegrees (angle) {
        return angle * (180 / Math.PI);
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    const moveShape = () => {
        const center = [(points[2].x + points[0].x)/2, (points[2].y + points[0].y)/2]
        
        const rotation = 
        [
            [Math.cos(toRadians(-5)), Math.sin(toRadians(-5)),0],
            [-Math.sin(toRadians(-5)), Math.cos(toRadians(-5)),0],
            [0,0,1]
        ]
        const newP1 = multiply(multiply(multiply([p1.x,p1.y,1],[[1,0,0],[0,1,0],[-center[0],-center[1],1]]),rotation),[[1,0,0],[0,1,0],[+center[0],+center[1],1]])
        const newP2 = multiply(multiply(multiply([p2.x,p2.y,1],[[1,0,0],[0,1,0],[-center[0],-center[1],1]]),rotation),[[1,0,0],[0,1,0],[+center[0],+center[1],1]])

        setP1({x:newP1[0] , y:newP1[1] + xOffset})
        setP2({x:newP2[0] , y:newP2[1] + xOffset})
    }

    const calculateSides = (p1, p2) => {
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
        const rotation = 
        [
            [Math.cos(toRadians(angle)),Math.sin(toRadians(angle)),0],
            [-Math.sin(toRadians(angle)),Math.cos(toRadians(angle)),0],
            [0,0,1]
        ]
        let a = p1.x - p2.x;
        let b = p1.y - p2.y;
        let c = Math.sqrt(a*a + b*b);
        const p3 = multiply(multiply(multiply([p2.x,p2.y+c,1],[[1,0,0],[0,1,0],[-p2.x,-p2.y,1]]),rotation),[[1,0,0],[0,1,0],[p2.x,p2.y,1]])
        const p4 = multiply(multiply(multiply([p1.x,p1.y+c,1],[[1,0,0],[0,1,0],[-p1.x,-p1.y,1]]),rotation),[[1,0,0],[0,1,0],[p1.x,p1.y,1]])
        
        setPoints(
            [
                {x: p1.x, y: p1.y},
                {x: p2.x, y: p2.y},
                {x: p3[0], y: p3[1]},
                {x: p4[0], y: p4[1]},
            ]
        )
    }

    return (
        <>
            <Container fluid >
                <Row>
                    <Col lg={4} style={{position:'relative'}}>
                        <Button className='backBtn' onClick={() => history.push('/')}>
                            <Image src={leftarrow} fluid>
                            </Image>
                        </Button>
                        <OverlayTrigger
                            placement='right'
                            overlay={<Tooltip> Афінним називається перетворення, що має такі властивості:
                                Може бути представлене як послідовність операцій з числа найпростіших: зсув, розтягнення/стиснення, поворот;
                                Під час перетворень зберігаються прямі лінії, паралельність прямих, відношення довжин відрізків, що лежать на одній прямій, і відношення площ фігур. Перетворення застосовуються автоматично після зміни параметрів. </Tooltip>}>
                            <Button className='helpBtn' onClick={() => history.push('/theory/transformation')}><h2><b>?</b></h2></Button>
                        </OverlayTrigger>
                        <h1>Афінні перетворення</h1>
                        <h4>Координати вершин квадрата</h4>
                        <Row>
                            <Col >
                                <Form.Group as={Row} className="mb-3 inputContainer">
                                    <Form.Label column sm={2}>
                                        X1
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input  className={'transformtaionInput'} type='number' step={0.2} defaultValue={p1.x} value={points[0].x.toFixed(1)} onChange={(e) => {setP1(prev => {return {x: +e.target.value, y: prev.y}})}}></input>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} className="mb-3 inputContainer">
                                    <Form.Label column sm={2}>
                                        Y1
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input className={'transformtaionInput'} type='number' step={0.2} defaultValue={p1.y} value={points[0].y.toFixed(1)} onChange={(e) => {setP1(prev => {return {x: prev.x, y: +e.target.value}})}}></input>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group as={Row} className="mb-3 inputContainer">
                                    <Form.Label column sm={2}>
                                        X2
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input className={'transformtaionInput'} type='number' step={0.2} defaultValue={p2.x} value={points[1].x.toFixed(1)} onChange={(e) => {setP2(prev => {return {x: +e.target.value, y: prev.y}})}}></input>

                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group as={Row} className="mb-3 inputContainer">
                                 <Form.Label column sm={2}>
                                        Y2
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input className={'transformtaionInput'} type='number' step={0.2} defaultValue={p2.y} value={points[1].y.toFixed(1)} onChange={(e) => {setP2(prev => {return {x: prev.x, y: +e.target.value}})}}></input>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4>Поворот та рух по вертикалі</h4>
                        <Form.Range defaultValue={5} min={0} max={20} step={0.25} onChange={(e) => {setXOffset(+e.target.value > sliderValue ? 0.2: -0.2); setSliderValue(e.target.value)}}></Form.Range>
                    </Col>
                    <Col lg={8}>
                        <Transformation points={points}></Transformation>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TransformationWindow
