import React , { useState, useEffect } from 'react'
import { Form, Row, Col, Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@restart/ui/esm/Button';
import { useHistory } from 'react-router-dom'
import leftarrow from '../Theory/TheoryNav/leftarrow.png'
import Transformation from './Transformation';
import { multiply } from 'mathjs'

const TransformationWindow = () => {
    let history = useHistory()
    const [sliderValue, setSliderValue] = useState(0)
    const [xOffset, setXOffset] = useState(0)
    const [p1, setP1] = useState([3, 3])
    const [p2, setP2] = useState([0, 3])
    const [points, setPoints] = useState(
        [
            [3, 3], 
            [6, 3], 
            [6, 6], 
            [3, 6]
        ]
    )
  
    useEffect(() => {
        moveShape()
    }, [sliderValue])

    useEffect(() => {
        calculateSides(p1, p2)
    }, [p1, p2])


    function toDegrees (angle) {
        return angle * (180 / Math.PI);
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    const moveShape = () => {
        const center = [(points[2][0] + points[0][0]) / 2, (points[2][1] + points[0][1]) / 2]
        const angle = -5;
        const rotation = 
        [
            [Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0],
            [-Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0],
            [0, 0, 1]
        ]
        const newP1 = 
            multiply(
                multiply(
                    multiply(
                        [p1[0], p1[1], 1],
                        [[1, 0, 0], [0, 1, 0], [-center[0], -center[1], 1]]
                    ),
                    rotation
                ),
                [[1, 0, 0], [0, 1, 0], [+center[0], +center[1], 1]]
            )

        const newP2 =
            multiply(
                multiply(
                    multiply(
                        [p2[0], p2[1], 1],
                        [[1, 0, 0],[0, 1, 0], [-center[0],-center[1], 1]]
                    ),
                    rotation
                ),
                [[1, 0, 0],[0, 1, 0], [+center[0], +center[1], 1]]
            )

        setP1([newP1[0], newP1[1] + xOffset])
        setP2([newP2[0], newP2[1] + xOffset])
    }

    const calculateSides = (p1, p2) => {
        const angle = toDegrees(Math.atan2(p2[1] - p1[1], p2[0] - p1[0]))
        const rotation = 
        [
            [Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0],
            [-Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0],
            [0, 0, 1]
        ]

        let a = p1[0] - p2[0];
        let b = p1[1] - p2[1];
        let c = Math.sqrt(a * a + b * b);

        const p3 = 
            multiply(
                multiply(
                    multiply(
                        [p2[0], p2[1] + c, 1],
                        [[1, 0, 0],[0, 1, 0],[-p2[0], -p2[1], 1]]
                    ), 
                    rotation
                ),
                [[1, 0, 0], [0, 1, 0], [p2[0], p2[1], 1]]
            )

        const p4 = 
            multiply(
                multiply(
                    multiply(
                        [p1[0], p1[1] + c, 1],
                        [[1, 0, 0],[0, 1, 0], [-p1[0], -p1[1], 1]]
                    ),
                    rotation
                ),
                [[1, 0, 0], [0, 1, 0], [p1[0], p1[1], 1]]
            )
        
        setPoints(
            [
                [p1[0], p1[1]],
                [p2[0], p2[1]],
                [p3[0], p3[1]],
                [p4[0], p4[1]],
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
                                Під час перетворень зберігаються прямі лінії, паралельність прямих, відношення довжин відрізків, що лежать на одній прямій, і відношення площ фігур.
                                Перетворення застосовуються автоматично після зміни параметрів. Для масштабу використовуйте колесико миші. </Tooltip>}>
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
                                        <input  className={'transformtaionInput'} type='number' step={0.2} defaultValue={p1[0]} value={points[0][0].toFixed(1)} onChange={(e) => {setP1(prev => {return [+e.target.value, prev[1]]})}}></input>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} className="mb-3 inputContainer">
                                    <Form.Label column sm={2}>
                                        Y1
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input className={'transformtaionInput'} type='number' step={0.2} defaultValue={p1[1]} value={points[0][1].toFixed(1)} onChange={(e) => {setP1(prev => {return [prev[0], +e.target.value]})}}></input>
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
                                        <input className={'transformtaionInput'} type='number' step={0.2} defaultValue={p2[0]} value={points[1][0].toFixed(1)} onChange={(e) => {setP2(prev => {return [+e.target.value, prev[1]]})}}></input>

                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group as={Row} className="mb-3 inputContainer">
                                 <Form.Label column sm={2}>
                                        Y2
                                    </Form.Label>
                                    <Col sm={10}>
                                        <input className={'transformtaionInput'} type='number' step={0.2} defaultValue={p2[1]} value={points[1][1].toFixed(1)} onChange={(e) => {setP2(prev => {return [prev[0], +e.target.value]})}}></input>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4>Поворот та рух по вертикалі</h4>
                        <Form.Range defaultValue={10} min={0} max={20} step={0.25} onChange={(e) => {setXOffset(+e.target.value > sliderValue ? 0.2: -0.2); setSliderValue(e.target.value)}}></Form.Range>
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
