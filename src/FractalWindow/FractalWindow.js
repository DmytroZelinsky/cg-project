import React from 'react'
import { useState } from 'react'
import { Row, Col, Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@restart/ui/esm/Button';
import Fractal from '../FractalWindow/Fractal.js'
import { useHistory } from 'react-router-dom'
import leftarrow from '../Theory/TheoryNav/leftarrow.png'
const FractalWindow = () => {
    const [colorMode, setColorMode] = useState('black')
    const [scale, setScale] = useState(6)
    let history = useHistory();
    return (
        <>
            <Container fluid >
                <Row>
                    <Col lg={4} style={{position:'relative'}}>
                        <Button className='backBtn' onClick={() => history.push('/')}><Image src={leftarrow} fluid></Image></Button>
                        <OverlayTrigger
                            placement='right'
                            overlay={<Tooltip> Це множина комплексних чисел, які при ітеративному процесі залишаються обмеженими в певному абсолютному значенні. Для масштабу використайте подвійне натискання. </Tooltip>}>
                            
                            <Button className='helpBtn' onClick={() => history.push('/theory/fractal')}><h2><b>?</b></h2></Button>
                        </OverlayTrigger>
                        <h1>Фрактал Мандельброта</h1>
                        <h4>Вибір кольору фракталу</h4>
                        <Button className='modeBtn blackModeBtn' onClick={() => setColorMode('black')}>
                            
                        </Button>
                        <Button className='modeBtn whiteModeBtn' onClick={() => setColorMode('white')}>
                            
                        </Button>
                        <Button className='modeBtn rainbowModeBtn' onClick={() => setColorMode('rainbow')}>
                            
                        </Button>
                       
                    </Col>
                    <Col lg={8}  id ='fractalContainer' onDoubleClick={() => setScale(prev => (prev - 2) < 2? 6: prev-2)}>
                        
                    </Col>
                </Row>
                
            </Container>
            <Fractal colorMode={colorMode} scale={scale} key={scale}/>
        </>
    )
}

export default FractalWindow
